import { useEffect, useState } from "react";
import "./Data_all.css";
import Swal from "sweetalert2";

function Data_all() {
  const [users, setUser] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3002/getusers");
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((user) => ({
          ...user,
          birthDate: user.birthDate
            ? new Date(user.birthDate).toISOString().split("T")[0]
            : "",
        }));
        setUser(formattedData);
      } else {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  const handleEditClick = (user) => {
    setEditUser({
      ...user,
      birthDate: user.birthDate
        ? new Date(user.birthDate).toISOString().split("T")[0]
        : "",
    });
  };
  const handleDeleteClick = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/deleteuser/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchUsers(); // เรียกใช้งานฟังก์ชัน fetchUsers เพื่อโหลดข้อมูลผู้ใช้งานใหม่
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการลบข้อมูล",
          text: "กรุณาลองใหม่อีกครั้ง",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการลบข้อมูล",
        text: "กรุณาลองใหม่อีกครั้ง",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3002/updateuser/${editUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editUser),
        }
      );
      if (response.ok) {
        fetchUsers();
        setEditUser(null);
      } else {
        console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
    }
  };

  const handleClosePopup = () => {
    setEditUser(null);
  };
  return (
    <section className="da2">
      <h3>รายชื่อ</h3>
      <table className="da3">
        <thead className="da4">
          <tr>
            <th className="da5 da5-1">ชื่อ-นามสกุล</th>
            <th className="da5 da5-2">ชื่อเล่น</th>
            <th className="da5 da5-3">วัน/เดือน/ปีเกิด</th>
            <th className="da5 da5-4">เพศ</th>
            <th className="da5 da5-5">อายุ</th>
            <th className="da5 da5-6">แก้ไข</th>
            <th className="da5 da5-7">ลบ</th>
          </tr>
        </thead>
        <tbody className="da6">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="da7 da5-1">{user.fullName}</td>
              <td className="da7 da5-2">{user.nickName}</td>
              <td className="da7 da5-3">{user.birthDate}</td>
              <td className="da7 da5-4">{user.gender}</td>
              <td className="da7 da5-5">{user.age}</td>
              <td className="da7 da5-6">
                <svg
                  onClick={() => handleEditClick(user)}
                  className="da9"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                </svg>
              </td>
              <td className="da7 da5-7">
                <svg
                  onClick={() => handleDeleteClick(user.id)}
                  className="da8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && (
        <div className="popup">
          <div className="popup-inner">
            <h2>แก้ไขข้อมูล</h2>
            <form className="fe1" onSubmit={handleFormSubmit}>
              <div className="fe2">
                <div className="e1">
                  <h5>ชื่อ-นามสกุล:</h5>
                  <input
                    className="e2 input a6"
                    type="text"
                    name="fullName"
                    value={editUser.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="e1">
                  <h5>ชื่อเล่น:</h5>
                  <input
                    className="e2 input a6"
                    type="text"
                    name="nickName"
                    value={editUser.nickName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="e1">
                  <h5>วัน/เดือน/ปีเกิด:</h5>
                  <input
                    className="e2 e3"
                    type="date"
                    name="birthDate"
                    value={editUser.birthDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="e1">
                  <h5>เพศ:</h5>
                  <select
                    value={editUser.gender}
                    onChange={handleInputChange}
                    className="e2 e4"
                    name="gender"
                  >
                    <option value="">เลือกเพศ</option>
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div>
                <div className="e1">
                  <h5>อายุ:</h5>
                  <input
                    className="input e5 e2"
                    type="text"
                    name="age"
                    value={editUser.age}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="e6">
                <button className="e7" type="submit">
                  บันทึก
                </button>
                <button className="e8" type="button" onClick={handleClosePopup}>
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Data_all;
