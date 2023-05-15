import { QRCode } from 'react-qrcode-logo';

const qrconnect = ({value}) => {
    const logoImage = "/images/qr-logo.svg"; 

    const qrCodeStyle = {
        backgroundColor: "white", 
        foregroundColor: "black", 
        padding: 20, 
        borderRadius: 10, 
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", 
      };
    
      const logoStyle = {
        borderRadius: "50%",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        backgroundColor: "blue"
      };
  
    return (

        <QRCode
          value={value}
          logoImage={logoImage}
          logoWidth={48} 
          logoHeight={48} 
          logoOpacity={1}
          size={300} 
          qrStyle='dots'
          eyeRadius={[ 5,5,5 ]}
          removeQrCodeBehindLogo={true}
          qrCodeStyle={qrCodeStyle} 
          logoStyle={logoStyle}
          />      
    );
  };
  
  export default qrconnect;
