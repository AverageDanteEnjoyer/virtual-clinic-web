import { useContext } from 'react';
import dayjs from 'dayjs';
import { CloseOutlined } from '@ant-design/icons';

import { Store, userType } from 'store';
import DeleteButton from 'Components/DeleteButton';
import { getDataFromToken } from 'localStorageAPI';

const useType = () => {
  const { state } = useContext(Store);
  const { userID } = getDataFromToken();

  const columns = [
    {
      title: 'Procedure name',
      dataIndex: ['procedure', 'name'],
      key: 'name',
    },
    {
      title: state.accountType === userType.PATIENT ? "Doctor's first name" : "Patient's first name",
      dataIndex: state.accountType === userType.PATIENT ? ['doctor', 'first_name'] : ['patient', 'first_name'],
      key: 'first_name',
    },
    {
      title: state.accountType === userType.PATIENT ? "Doctor's last name" : "Patient's last name",
      dataIndex: state.accountType === userType.PATIENT ? ['doctor', 'last_name'] : ['patient', 'last_name'],
      key: 'last_name',
    },
    {
      title: 'Procedure start time',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (value: string) => dayjs(value).format('HH:mm'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <DeleteButton>
          <CloseOutlined />
        </DeleteButton>
      ),
    },
  ];

  //It is here because we need to avoid compilation error, and we don't have api yet
  const patient_url = '';
  const doctor_url = '';

  const fetch_url = state.accountType === userType.PATIENT ? patient_url : doctor_url;

  return { columns, fetch_url };
};

export default useType;
