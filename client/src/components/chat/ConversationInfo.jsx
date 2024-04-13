import { useState } from "react";
import { useStateProvider } from "../../context/StateContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { GrGroup } from "react-icons/gr";

const ConversationInfo = ({ chat, images, files, links, members }) => {
  const [{ messages, userInfo, currentChat, groups, socket }, dispatch] =
    useStateProvider();
  const [showAllImage, setShowAllImage] = useState(false);
  const [showAllFile, setShowAllFile] = useState(false);
  const [showAllLink, setShowAllLink] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const []
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleShowAllImage = () => {
    setShowAllImage(!showAllImage);
  };
  const toggleShowAllFile = () => {
    setShowAllFile(!showAllFile);
  };

  // const groupFilesByDate = (files) => {
  //     const groupedFiles = {};
  //     files.forEach((file) => {
  //         const date = file.date;
  //         if (!groupedFiles[date]) {
  //             groupedFiles[date] = [];
  //         }
  //         groupedFiles[date].push(file);
  //     });
  //     return groupedFiles;
  // };

  // // Nhóm các file theo ngày gửi
  // const groupedFiles = groupFilesByDate(files);
  // // Lấy danh sách ngày gửi để sắp xếp
  // const sortedDates = Object.keys(groupedFiles).sort();

  const toggleShowAllLink = () => {
    setShowAllLink(!showAllLink);
  };
  const limitedImages = showAllImage ? images : images.slice(0, 6);
  const limitedFiles = showAllFile ? files : files.slice(0, 3);
  const limitedLinks = showAllLink ? links : links.slice(0, 3);

  const onDeleteHistory = () => {
    window.alert("xoas ruif nef");
  };
  const onLeaveGroup = () => {
    window.alert("roiwf nhoms rooif nef");
  };
  const [showMemberList, setShowMemberList] = useState(false);

  const toggleMemberList = () => {
    setShowMemberList(!showMemberList);
  };

  return (
    <div>
      <div className=" tw-bg-gray-50 tw-overflow-auto custom-scrollbar ">
        <p className="fs-4 text-center border-bottom fw-bold m-0">
          Conversation Info
        </p>
        <div style={{ maxHeight: "95vh" }}>
          <div className="mb-2 mt-2 border-bottom d-flex justify-content-center align-items-center">
            <div className="text-center">
              <img
                src={`https://lh3.googleusercontent.com/a/ACg8ocK1LMjQE59_kT4mNFmgxs6CmqzZ24lqR2bJ4jHjgB6yiW4=s96-c`} // Bạn cần thay đổi đường dẫn hình ảnh tương ứng
                className="me-2 mb-3 tw-h-20 tw-w-20 tw-rounded-full"
                // height={80}
                // width={80}
                // style={{ borderRadius: '50%' }}
                alt="Girl Friend"
              />
              <p className="fs-6 fw-bold">{chat.name}</p>
            </div>
          </div>
          <div className="mb-2 tw-border-b tw-ml-2">
            <span className="tw-font-bold tw-text-[18px]">Member List</span>
            {currentChat.type == "public" && (
              <button
                className="tw-block tw-mt-2 tw-mx-auto tw-mb-4 underline hover:tw-bg-gray-200"
                style={{ width: "400px", height: "40px" }}
                onClick={toggleMemberList}
              >
                <div className="tw-flex  align-items-center">
                  <GrGroup size={20} />
                  <span className="tw-pl-5">{members.length} members</span>
                </div>
              </button>
            )}
            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Member List</h2>
                  <ul>
                    {members.map((member, index) => (
                      <li key={index}>{member.name}</li>
                    ))}
                  </ul>
                  <button className="mt-4" onClick={toggleModal}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mb-2 tw-border-b tw-ml-2">
            <span className="tw-font-bold tw-text-[18px]">
              Photos / Videos{" "}
            </span>
            <div className="tw-flex tw-flex-wrap tw-mx-auto tw-overflow-auto custom-scrollbar tw-max-h-80">
              {limitedImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 px-4 mb-4"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-auto tw-mx-auto"
                    style={{ maxHeight: "85px" }}
                  />
                </div>
              ))}
            </div>
            {images.length > 6 && (
              <button
                onClick={toggleShowAllImage}
                className="tw-font-bold tw-block tw-mt-2 tw-mx-auto tw-mb-4 tw-text-black underline tw-px-32 tw-py-2"
                style={{ backgroundColor: "#eaedf0" }}
              >
                {showAllImage ? "Collapse" : "Show all"}
              </button>
            )}
          </div>
          <div className="mb-2 tw-border-b tw-ml-2">
            <span className="tw-font-bold tw-text-[18px]">Files</span>
            <ul className="tw-block tw-p-0">
              {limitedFiles.map((file, index) => (
                <li
                  key={index}
                  className="tw-flex items-center py-1 hover:tw-bg-gray-200"
                >
                  {/* {file.imageUrl} */}
                  <img
                    src={file.imageUrl}
                    alt={file.name}
                    className="w-full h-auto"
                    style={{ maxHeight: "60px" }}
                  />
                  <div className="tw-block tw-mx-2">
                    <p className="">{file.name}</p>
                    <div className="tw-flex ">
                      <p className="tw-mr-32">{file.size}</p>
                      <p className="tw-ms-auto">{file.date}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {files.length > 3 && (
              <button
                onClick={toggleShowAllFile}
                className="tw-font-bold tw-block tw-mt-2 tw-mx-auto tw-mb-4 tw-text-black underline tw-px-32 tw-py-2"
                style={{ backgroundColor: "#eaedf0" }}
              >
                {showAllFile ? "Collapse" : "Show all"}
              </button>
            )}
          </div>
          <div className="mb-2 tw-border-b tw-ml-2">
            <span className="tw-font-bold tw-text-[18px]">Links</span>
            <ul className="tw-p-0">
              {limitedLinks.map((link, index) => (
                <li key={index} className="tw-my-3 hover:tw-bg-gray-200">
                  <p className="tw-font-bold tw-text-[13px] tw-mb-0">
                    {link.title}
                  </p>
                  <a
                    href={link.url}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {link.url}
                  </a>
                </li>
              ))}
            </ul>
            {links.length > 3 && (
              <button
                onClick={toggleShowAllLink}
                className="tw-block tw-mt-2 tw-mx-auto tw-mb-4 tw-text-black underline tw-px-32 tw-py-2"
                style={{ backgroundColor: "#eaedf0" }}
              >
                {showAllLink ? "Collapse" : "Show all"}
              </button>
            )}
          </div>
          <div className="mb-2 tw-ml-2 ">
            <span className="tw-font-bold tw-text-[18px]">Privacy Setting</span>
            {currentChat.type == "private" && (
              <button
                onClick={onDeleteHistory}
                className="tw-block tw-mt-2 tw-mx-auto tw-mb-4 underline"
                style={{ width: "400px", height: "40px", color: "red" }}
              >
                <div className="tw-flex  align-items-center">
                  <FaRegTrashCan size={20} color="red" />
                  <span className="tw-pl-5">Delete History</span>
                </div>
              </button>
            )}
            {currentChat.type == "public" && (
              <div>
                <button
                  onClick={onDeleteHistory}
                  className="tw-block tw-mt-2 tw-mx-auto tw-mb-4 underline"
                  style={{ width: "400px", height: "40px", color: "red" }}
                >
                  <div className="tw-flex  align-items-center">
                    <FaRegTrashCan size={20} color="red" />
                    <span className="tw-pl-5">Delete History</span>
                  </div>
                </button>
                <button
                  onClick={onLeaveGroup}
                  className="tw-block tw-mt-2 tw-mx-auto tw-mb-4 underline"
                  style={{ width: "400px", height: "40px", color: "red" }}
                >
                  <div className="tw-flex  align-items-center">
                    <MdLogout size={20} color="red" />
                    <span className="tw-pl-5">Leave Group</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConversationInfo;
