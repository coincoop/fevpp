import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import axios from "axios";

export default function PolicyBody() {
  const [mota, setMota] = useState("");

  useEffect(() => {
    const fetchHome = async () => {
      const response = await axios.get(`${API_URL}home/status`);
      setMota(response.data.mota);
    };
    fetchHome();
  }, []);
  return (
    <div className="container">
      <div style={{margin: "40px"}} dangerouslySetInnerHTML={{ __html: mota }} />
    </div>
  );
}
