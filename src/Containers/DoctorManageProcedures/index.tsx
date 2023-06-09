import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import { useContext, useState } from 'react';
import { capitalize, lowerCase } from 'lodash';
import { useNavigate } from 'react-router-dom';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { Spin, Col, Row, Modal, FormItemProps } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import routes from 'routes';

import { Store } from 'store';
import { getDurationFormatted } from 'helpers';
import pushNotification from 'pushNotification';
import { getDataFromToken } from 'localStorageAPI';
import palette from 'palette';

import useModal from 'Hooks/useModal';

import handleDelete from 'Containers/DoctorManageProcedures/deleteProcedure';
import addProcedure from 'Containers/DoctorManageProcedures/EditForm/addProcedure';

import { StyledForm, SubmitButton } from 'Components/DeleteButton';
import { DeleteButton } from 'Components/DeleteButton';
import Input from 'Components/Input';
import { Title } from 'Components/Typography';
import PaginatedTable from 'Components/PaginatedTable';
import Button from 'Components/Button';
import { StyledTitle } from 'Components/Typography/styles';

import EditForm from './EditForm';
import { Procedure } from './fetchProcedures';
import getDoctorProcedures from './fetchProcedures';

dayjs.extend(Duration);
dayjs.extend(RelativeTime);

interface formItem extends FormItemProps {
  type: string;
}

export interface DoctorProceduresType {
  id: number;
  name: string;
  needed_time_min: number;
}

export interface FormData {
  name: string;
  needed_time_min: number;
}

const DoctorManageProcedures = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<DoctorProceduresType>({ id: 0, name: '', needed_time_min: 0 });
  const [tableState, setTableState] = useState(Date.now());
  const [formState, setFormState] = useState(Date.now());
  const [form] = StyledForm.useForm();
  const { userID } = getDataFromToken();
  const { dispatch } = useContext(Store);
  const { isOpened, openModal, closeModal } = useModal();
  const { confirm } = Modal;
  const navigate = useNavigate();

  const onFinish = async (values: FormData) => {
    setLoading(true);
    try {
      const response = await addProcedure(values);
      const responseBody = await response.json();

      if (response.ok) {
        pushNotification('success', 'Success', 'Procedure has been added!');
        form.resetFields();
        setTableState(Date.now());
      } else {
        Object.entries(responseBody.errors).forEach(([key, value]) => {
          const description = `${capitalize(key.replaceAll('_', ' '))} ${value}.`;

          formItems.forEach(({ name }) => {
            key === name && form.setFields([{ name: key, errors: [description] }]);
          });
        });
      }
    } catch {
      dispatch({ type: 'logout' });
      navigate(routes.logIn.path);
    } finally {
      setLoading(false);
    }
  };

  const deleteOnClick = async (record: DoctorProceduresType) => {
    setLoading(true);
    try {
      const response = await handleDelete(record);
      if (response.ok) {
        setTableState(Date.now());
        pushNotification('success', 'Success', 'Procedure has been deleted!');
      }
    } catch {
      dispatch({ type: 'logout' });
      navigate(routes.logIn.path);
    } finally {
      setLoading(false);
    }
  };

  const showConfirm = async (record: DoctorProceduresType) => {
    confirm({
      title: 'Do you want to delete this procedure?',
      icon: (
        <ExclamationCircleTwoTone twoToneColor={[palette.white, palette.ultraViolet]} style={{ fontSize: '40px' }} />
      ),
      okText: 'Yes',
      cancelText: 'No',
      autoFocusButton: 'cancel',
      okButtonProps: {
        style: {
          backgroundColor: palette.ultraViolet,
        },
      },
      onOk() {
        deleteOnClick(record);
      },
    });
  };

  const onClose = () => {
    closeModal();
    setFormState(Date.now());
  };

  const formItems: formItem[] = [
    {
      name: 'name',
      label: 'Procedure name',
      type: 'text',
      rules: [{ required: true, message: 'Please input procedure name' }],
    },
    {
      name: 'needed_time_min',
      label: 'Procedure duration (in minutes)',
      type: 'number',
      rules: [{ required: true, message: 'Please input procedure duration' }],
    },
  ];

  const formItemsJSX = formItems.map(({ name, label, type, rules }, idx) => (
    <StyledForm.Item key={idx} label={label} name={name} rules={rules}>
      <Input type={type} prefix={null} placeholder={`Enter your ${lowerCase(label as string)}`} min="1" />
    </StyledForm.Item>
  ));

  const columns = [
    {
      title: 'Procedure name',
      dataIndex: 'name',
      key: 'name',
      filtered: true,
    },
    {
      title: 'Procedure duration',
      dataIndex: 'needed_time_min',
      key: 'needed_time_min',
      render: (text: number) => {
        const hours = dayjs.duration(text, 'minutes').hours();
        const minutes = dayjs.duration(text, 'minutes').minutes();

        return getDurationFormatted(hours, minutes);
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 1,
      render: (record: DoctorProceduresType) => {
        return (
          <Row gutter={[5, 5]} justify="center" align="middle">
            <Col>
              <Button
                onClick={() => {
                  setRecord(record);
                  openModal();
                }}
              >
                <EditOutlined />
              </Button>
            </Col>
            <Col>
              <DeleteButton onClick={async () => await showConfirm(record)}>
                <DeleteOutlined />
              </DeleteButton>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Spin spinning={loading} tip="waiting for server response...">
          <PaginatedTable<Procedure>
            data={procedures}
            setData={setProcedures}
            columns={columns}
            fetchData={getDoctorProcedures(userID || 0)}
            pageSizeOptions={[4]}
            key={tableState}
            locale={{
              emptyText: `You haven't added any procedure yet`,
            }}
          />
        </Spin>
      </Col>
      <Col span={24}>
        <Title centered level={2}>
          Add new procedure
        </Title>
        <StyledForm form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
          <Row>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }}>
              {formItemsJSX}
            </Col>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }}>
              <SubmitButton size="large" htmlType="submit">
                Submit
              </SubmitButton>
            </Col>
          </Row>
        </StyledForm>
      </Col>
      <Modal
        title={
          <StyledTitle level={2} centered>
            Edit procedure
          </StyledTitle>
        }
        onCancel={onClose}
        footer={null}
        open={isOpened}
        centered
      >
        <Row>
          <Col xs={{ span: 20, offset: 2 }}>
            <EditForm setTableState={setTableState} procedure={record} closeEditModal={onClose} key={formState} />
          </Col>
        </Row>
      </Modal>
    </Row>
  );
};

export default DoctorManageProcedures;
