import { FormItemProps } from 'antd';
import { useContext, useState } from 'react';
import { capitalize, lowerCase } from 'lodash';
import { useNavigate } from 'react-router-dom';

import routes from 'routes';
import { Store } from 'store';
import pushNotification from 'pushNotification';

import handleEdit from 'Containers/DoctorManageProcedures/editProcedure';

import { CenteredContainer, StyledForm, SubmitButton } from 'Components/DeleteButton';
import Input from 'Components/Input';

import { DoctorProceduresType, FormData } from '../index';

interface formItem extends FormItemProps {
  type: string;
}

interface EditFormProps {
  setTableState: (date: number) => void;
  procedure: DoctorProceduresType;
  closeEditModal: () => void;
}

const EditForm = ({ setTableState, procedure, closeEditModal }: EditFormProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = StyledForm.useForm();
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);

  const onFinish = async (values: FormData) => {
    setLoading(true);
    try {
      const response = await handleEdit({ id: procedure.id, ...values });

      if (response.ok) {
        const { name, needed_time_min } = values;
        setTableState(Date.now());
        pushNotification('success', 'Success', 'Procedure has been updated');
        form.setFieldsValue({
          name,
          needed_time_min,
        });

        setTimeout(() => {
          closeEditModal();
        }, 5000);
      } else {
        const responseBody = await response.json();

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

  const formItems: formItem[] = [
    {
      name: 'name',
      label: 'Procedure name',
      type: 'text',
      initialValue: procedure.name,
      rules: [{ required: true, message: 'Please input procedure name' }],
    },
    {
      name: 'needed_time_min',
      label: 'Procedure time (minutes)',
      type: 'number',
      initialValue: procedure.needed_time_min,
      rules: [{ required: true, message: 'Please input procedure time' }],
    },
  ];

  const formItemsJSX = formItems.map(({ name, label, type, initialValue, rules }, idx) => (
    <StyledForm.Item key={idx} label={label} name={name} rules={rules} initialValue={initialValue}>
      <Input
        type={type}
        prefix={null}
        placeholder={`Enter your ${lowerCase(label as string)}`}
        min="1"
        value={initialValue}
      />
    </StyledForm.Item>
  ));

  return (
    <StyledForm form={form} onFinish={onFinish} autoComplete="off" layout="vertical" requiredMark={false}>
      {formItemsJSX}
      <CenteredContainer>
        <SubmitButton size="large" htmlType="submit" loading={loading}>
          Submit
        </SubmitButton>
      </CenteredContainer>
    </StyledForm>
  );
};

export default EditForm;
