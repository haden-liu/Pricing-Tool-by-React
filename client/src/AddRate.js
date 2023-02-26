import React, { useState } from "react";

export default function AddRates () {
    const [file, setFile] = useState()

    const fileReader = new FileReader()

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    return(
        <div>
            <div style={{ textAlign: "center" }}>
                <h1>Add Rate File </h1>
                <form>
                    <input type={"file"} accept={".csv"} onChange={handleChange} />
                    <button>IMPORT CSV</button>
                </form>
            </div>
        </div>
    )
}