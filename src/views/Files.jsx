import {Link} from "react-router-dom";
import '../css/files.css';

export default function Files() {

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
                <td>January 10, 2023</td>
                <td>
                    Instructor Name
                </td>
                <td>
                <button className="download-btn">Download</button>
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
                <button className="download-btn">Download</button>
                </td>
            </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}
