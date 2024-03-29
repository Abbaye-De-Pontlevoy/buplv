import QrReader from "../components/AQR/AQR";
import QRCodeReader from "../components/QRCodeReader/QRCodeReader";
import QRCodeReaderModal from "../components/QRCodeReader/QRCodeReaderModal";
import AQRModal from "../components/AQR/AQRModal";

const QRCodePage = () => {
  return (
    <div>
      <h1>Lecture QR Code</h1>
      <AQRModal />
    </div>
  );
};

export default QRCodePage;
