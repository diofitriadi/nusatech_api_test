import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AuthLogout } from "../redux/actions/Auth";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: auth } = useSelector((state) => state.auth);
  const [refetch, setRefetch] = useState(false);

  // Modal
  const [addModal, setAddModal] = useState(false);

  // Get Data Team
  const [getTeam, setGetTeam] = useState({
    name: "",
    position: "",
    number_position: "",
    img: "",
  });

  useEffect(() => {
    axios
      .get(`https://nusatechapi.404official.com/api/team`)
      .then((res) => {
        setGetTeam(res.data);
        console.log(res.data.data, "tesss");
      })
      .catch((err) => console.log(err));
  }, []);

  // Add Data Team
  const [formAdd, setFormAdd] = useState({});

  const formData = new FormData();
  formData.append("name", formAdd.name);
  formData.append("position", formAdd.position);
  formData.append("number_position", formAdd.number_position);
  formData.append("images", formAdd.img);
  const handleAddTeams = async (e) => {
    e.preventDefault();
    console.log(formData, "cikiwiw");
    try {
      const result = await axios({
        method: "POST",
        data: formData,
        url: `https://nusatechapi.404official.com/api/add-team`,
        headers: {
          authorization: `Bearer ${auth.access_token}`,
        },
      });
      if (result) {
        Swal.fire({
          icon: "success",
          text: "Add Teams Success!",
        });
        setRefetch(!refetch);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleDeleteTeams = (id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "DELETE",
          url: `https://nusatechapi.404official.com/api/team/${id}`,
          headers: {
            authorization: `Bearer ${auth.access_token}`,
          },
        });
        Swal.fire("Deleted!", "Your file has been deleted", "success");
      }
      setRefetch(!refetch);
    });
  };

  return (
    <>
      <div className="bg-slate-200 h-full">
        <div className="w-[80%] mx-auto text-sm py-6">
          <p className="text-2xl mt-5 mb-5 text-center font-bold text-[#205375]">
            PAGE TO MANAGE TEAMS
          </p>
          <div className="flex justify-between my-5 align-end">
            <div className="flex flex-end justify-end items-end">
              <button
                className="w-full h-12 py-2 px-4 rounded-xl bg-[#205375] hover:bg-[#112B3C] text-[#EFEFEF] font-bold transition mb-2"
                onClick={() => setAddModal(true)}
              >
                Add New Teams
              </button>
            </div>
            <button
              className="bg-[#205375] text-[#EFEFEF] hover:bg-[#112B3C] transition px-4 py-2 rounded-xl font-bold"
              onClick={() => {
                dispatch(AuthLogout());
                Swal.fire({
                  icon: "success",
                  text: "Logout Success!",
                });
                navigate("/", { replace: true });
              }}
            >
              Logout
            </button>
          </div>

          <div className="d-flex flex-wrap justify-content-between">
            <>
              <table className="border-2 table-auto w-full">
                <thead className="border-2 ">
                  <tr className="border-2 bg-[#205375] text-white">
                    <th className="border-2 p-3">No.</th>
                    <th className="border-2">Nama Tim</th>
                    <th className="border-2 ">Jabatan</th>
                    <th className="border-2 ">Posisi</th>
                    <th className="border-2 ">Upload File</th>
                    <th className="border-2 ">Action</th>
                  </tr>
                </thead>
                <tbody className="border-2 text-center bg-white text-black">
                  {getTeam?.data?.map((item, index) => {
                    return (
                      <>
                        <tr className="border-2">
                          <td className="border-2 font-bold">{item.id}</td>
                          <td className="border-2">{item.name}</td>
                          <td className="border-2">{item.position}</td>
                          <td className="border-2">{item.number_position}</td>
                          <td className="border-2">
                            <img
                              className="mx-auto"
                              src={item.img}
                              alt="tim"
                              width={100}
                            />
                          </td>
                          <td className="flex flex-row justify-evenly items-center text-white h-20">
                            <button
                              className="w-13 py-2 px-3 bg-red-600 rounded-lg"
                              onClick={() => handleDeleteTeams(item.id)}
                            >
                              <RiDeleteBin6Line />
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </>
          </div>
        </div>
      </div>
      {/* Add Modal */}
      {addModal ? (
        <>
          <div className="flex justify-center items-center overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-zinc-200/80">
            <div className="relative w-[50%] my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[80%] mx-auto bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 border-b border-solid border-gray-300 bg-[#205375] rounded-t">
                  <h3 className="text-3xl font-semibold text-white">
                    Add New Team
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setAddModal(false)}
                  >
                    <span className="text-white opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto ">
                  <form
                    className="shadow-md rounded p-5 w-full mx-auto border"
                    onSubmit={(e) => handleAddTeams(e)}
                  >
                    <label className="block text-black text-sm font-bold mb-1">
                      Nama Tim
                    </label>
                    <input
                      className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-black my-1"
                      onChange={(e) => {
                        setFormAdd((prevData) => ({
                          ...prevData,
                          name: e.target.value,
                        }));
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Position
                    </label>
                    <input
                      className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-black my-1"
                      onChange={(e) => {
                        setFormAdd((prevData) => ({
                          ...prevData,
                          position: e.target.value,
                        }));
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Number Position
                    </label>
                    <input
                      className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-black my-1"
                      onChange={(e) => {
                        setFormAdd((prevData) => ({
                          ...prevData,
                          number_position: e.target.value,
                        }));
                      }}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-black my-1"
                      onChange={(e) => {
                        setFormAdd((prevData) => ({
                          ...prevData,
                          img: e.target.files[0],
                        }));
                      }}
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setAddModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-[#205375] text-[#EFEFEF] hover:bg-[#112B3C] transition font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={(e) => {
                      handleAddTeams(e);
                      console.log(formAdd, "testestes");
                      setAddModal(false);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
