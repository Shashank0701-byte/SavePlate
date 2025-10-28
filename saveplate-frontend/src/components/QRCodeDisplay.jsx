import React from "react";
import { QRCode } from "qrcode.react";

function QRCodeDisplay({ value }) {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="bg-gray-200 p-4 rounded">
        {/* Real QR Code using qrcode.react */}
        <QRCode value={value} size={150} />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Scan to pick up your reserved meal
      </p>
    </div>
  );
}

export default QRCodeDisplay;
