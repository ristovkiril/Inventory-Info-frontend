import React from 'react';
import {useDropzone} from 'react-dropzone';
import {useTranslation} from "react-i18next";

function Dropzone(props) {

    const {t} = useTranslation();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        multiple: false,
        accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        onDrop: (e) => {
            console.log(e)
            console.log(acceptedFiles);
            props.setFile(e);
        }
    });

    const files = props.files.length !== 0 ?
        <li key={props.files.path}>
            {props.files.path} - {props.files.size} bytes
        </li> : ""

    return (
        <section className="container p-0">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>{t("Drag 'n' drop file here, or click to select file")}</p>
            </div>
            <aside>
                <h4>{t("Files")}</h4>
                <ul>{files}</ul>
            </aside>
        </section>
    );
}

export default Dropzone;