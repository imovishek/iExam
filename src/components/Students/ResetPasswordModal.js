import styled from 'styled-components'
import React, { useState } from 'react'
import { Modal, Input, message } from 'antd'
import api from '../../utitlities/api'
import { STUDENT } from '../../utitlities/constants'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonStyled } from '../../utitlities/styles'

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`

const InputStyled = styled(Input)`
  margin-right: 10px;
`
const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-left: 10px;
  margin: auto;
  ${(props) => (props.loading ? "animation: rotate 2s linear infinite;" : "")}
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ResetPasswordModal = ({
  selectedUser,
  visible,
  setVisibility,
}) => {
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setPassword('');
    setShowPassword(false)
    setVisibility(false)
  }

  const onSubmit = async () => new Promise(resolve => {
    if (!password) {
      resolve();
      return message.error('Please enter a password');
    }
    setLoading(true);
    return api.resetPassword(selectedUser, password)
      .then(() => {
        message.success('Reset Password successful!')
        resolve();
        setLoading(false);
        closeModal()
      })
      .catch(() => {
        resolve();
        setLoading(false);
        closeModal()
        message.error('Error on resetting password, please try again.')
      })
  })

  return (
    <Modal
      title='Reset Password'
      visible={visible}
      width={400}
      height={300}
      onOk={onSubmit}
      onCancel={() => closeModal()}
      confirmLoading={loading}
      okText={'Reset Password'}
    >
      <Row columns="1fr 1fr">
        <InputStyled
          value={password}
          type={!showPassword ? 'password' : ''}
          onChange={e => setPassword(e.target.value)}
          addonAfter={<FontAwesomeIconStyled icon={faEye} onClick={() => setShowPassword(!showPassword)}/>}
        />
        {selectedUser.userType === STUDENT && (
          <ButtonStyled
            onClick={() => {
              setPassword(selectedUser.registrationNo)
            }}
          >
            Use RegNo
          </ButtonStyled>
        )}
      </Row>
    </Modal>
  )
}

export default ResetPasswordModal
