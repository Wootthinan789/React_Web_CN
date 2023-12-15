import { useState } from 'react';
import './FormInsert.css';
import './Modal/Modal.css';

const FormInsert = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const [documentId, setDocumentId] = useState('');
  const [remark, setRemark] = useState('');
  const [user_, setUser_] = useState('');
  const [modalDocumentId, setModalDocumentId] = useState('');
  const [modalUser, setModalUser] = useState('');

  const inputDocument = (event) => {
    setDocumentId(event.target.value);
  };

  const inputRemark = (event) => {
    setRemark(event.target.value);
  };

  const inputUser_ = (event) => {
    setUser_(event.target.value);
  };

  const saveItem = async (event) => {
    try {
      event.preventDefault();

      const itemData = {
        document_id: documentId,
        Remark: remark,
        user: user_,
      };

      setModalDocumentId(itemData.document_id);
      setModalUser(itemData.user);

      console.log(itemData);
      console.log('document_id : ', itemData.document_id);
      console.log('user : ', itemData.user);

      const response = await fetch(
        'http://rpa-apiuat.inet.co.th:80/dug/Document_id/CN',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            document_id: itemData.document_id,
            user: itemData.user,
          }),
        }
      );

      const responseData = await response.text();
      console.log(responseData);

      const req = 'https://platform.one.th/chat/api/v1/chatbot-api/message';
      const header = {
        'Content-Type': 'application/json',
        'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RfaWQiOiI2YzBlYzVjNS0zNmNmLTQ1NDgtYTE2Zi0wOGNkNGIxNzE0MjQiLCJib3Rfc2lnbmF0dXJlIjoiMjg4MDQ4MTBkNTFiYjRiYTRlMzg2YjNjZGNlZGU4ODc2OTg0Y2JhY2QxYTJhMDRkNTM4MGQ0YzA0YmUzNDA5YyIsImVudiI6InByZCIsInVzZXJfaWQiOiI5Y2RlOGYyZC1lNGQzLTQ4Y2EtYjNmYi1mOGQ0NDg1YzQzNTIifQ.M5ldqd1f0z6-3Da9iukVFaRk7AMGXc6HZ1NWMNhJz14',
      };

      const responseChat = await fetch(req, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          to: '96819c51-d43e-4e4e-a1f2-5f54964a7d79',
          message: responseData,
          type: 'text',
          custom_notification: responseData,
        }),
      });
      console.log(responseChat);

      if (response.status === 200) {
        console.log('ส่งข้อมูลเลขเอกสารสำเร็จ');
        setDocumentId('');
        setRemark('');
        setUser_('');
      } else {
        console.error(
          'เกิดข้อผิดพลาดในการส่งข้อมูลเลขเอกสารหรือเอกสารเคยดักแล้ว'
        );
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={saveItem}>
        <div className="form-control">
          <label>เลขเอกสาร</label>
          <input
            type="text"
            placeholder="ระบุชื่อรายการ"
            onChange={inputDocument}
            value={documentId}
          />
        </div>
        <div className="form-control">
          <label>เหตุผล</label>
          <input
            type="text"
            placeholder="โปรดระบุเหตุผล หากไม่มีเหตุผล ใช้ (-)"
            onChange={inputRemark}
            value={remark}
          />
        </div>
        <div className="form-control">
          <label>User</label>
          <input type="text" placeholder="กรอก user" onChange={inputUser_} value={user_} />
        </div>
        <div>
          <button type="submit" className="btn" onClick={toggleModal}>
            Add Data
          </button>
        </div>
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Details</h2>
              <p>
                Document : {modalDocumentId}
                <br />
                User : {modalUser}
              </p>
              <button className="close-modal" onClick={toggleModal}>
                OK
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormInsert;