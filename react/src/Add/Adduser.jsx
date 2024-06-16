import { useState } from "react";
import Data_all from "../data_all/Data_all";
import "./Adduser.css";
import Swal from "sweetalert2";

function Adduser() {
  const [formData, setFormData] = useState({
    fullName: "",
    nickName: "",
    birthDate: "",
    gender: "",
    age: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มรายชื่อสำเร็จ",
          showConfirmButton: true,
        }).then(() => {
          setFormData({
            fullName: "",
            nickName: "",
            birthDate: "",
            gender: "",
            age: "",
          });
          window.location.reload();
        });
      } else {
        const error = await response.text();
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการเพิ่มรายชื่อ",
          text: `เกิดข้อผิดพลาด: ${response.status} ${response.statusText}\n${error}`,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการเพิ่มรายชื่อ",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <section className="a1">
      <div className="a2">
        <form className="a3" onSubmit={handleSubmit}>
          <div className="a4">
            <div className="a5">
              <h3>ชื่อ-นามสกุล</h3>
              <input
                className="input a6"
                type="text"
                placeholder="ชื่อ-นามสกุล"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
            <div className="a5">
              <h3>ชื่อเล่น</h3>
              <input
                value={formData.nickName}
                onChange={(e) =>
                  setFormData({ ...formData, nickName: e.target.value })
                }
                className="input a6"
                type="text"
                placeholder="ชื่อเล่น"
              />
            </div>
          </div>
          <div className="a7">
            <div className="a5">
              <h3>วัน/เดือน/ปีเกิด</h3>
              <input
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className="a8"
                type="date"
              />
            </div>
            <div className="a5">
              <h3>เพศ</h3>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="a9"
              >
                <option value="">เลือกเพศ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
            </div>
            <div className="a5">
              <h3>อายุ</h3>
              <input
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="input a8"
                type="text"
                placeholder="อายุ"
              />
            </div>
          </div>

          <div className="a10">
            <button className="a11 a12">
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="25"
                    height="25"
                    className="icon"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />{" "}
                  </svg>
                </div>
              </div>
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
      <div className="da1">
        <Data_all />
      </div>
    </section>
  );
}

export default Adduser;
