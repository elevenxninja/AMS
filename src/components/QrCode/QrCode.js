import React from 'react';
import QRCode from "qrcode.react";
import classes from './QrCode.css';

const QrCode = (props) =>{
    const downloadQR = () =>{
        const canvas = document.getElementById("123456");
        console.log(canvas)
    const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    window.location.href= pngUrl;
    }
    return(
        <div className={classes.Qr}>
            <div>
                <QRCode
                    id="123456"
                    value={props.value}
                    size={290}
                    level={"H"}
                    includeMargin={true}
                />
            </div>
            <a id="123457" onClick={downloadQR}> Download QR </a>
        </div>
    );
}

export default QrCode;