import {Link, useNavigate} from "react-router-dom";
import '../css/files.css';

export default function Files() {
  const navigate = useNavigate();
  const onSubmit = ev => {
      ev.preventDefault();
      navigate("/notavailable");
  }

  return (
    <div>
      <div className="card animated fadeInDown">
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Files</h1>
        </div>
        <table>
          <thead>
          <tr>
            <th>File Name</th>
            <th>Date Uploaded</th>
            <th>Author</th>
            <th>Download</th>
          </tr>
          </thead>
            <tbody>
            <tr>
                <td className="content-overflow">
                    Introduction-to-web-dev.pdf
                </td>
                <td className="content-overflow">January 10, 2023</td>
                <td className="content-overflow">
                    Instructor Name
                </td>
                <td>
                <button className="download-btn" onClick={onSubmit}>Download</button>
                </td>
            </tr>
            <tr>
                <td className="content-overflow">
                    Basic-HTML.pptx
                </td>
                <td>January 10, 2023</td>
                <td>
                    Instructor Name
                </td>
                <td>
                <button className="download-btn" onClick={onSubmit}>Download</button>
                </td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}
