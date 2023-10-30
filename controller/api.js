import jwt from "jsonwebtoken"
import fetch from "node-fetch"
import qr from "qr-image"


export const index = async(req,res)=>{
    try {
        res.render("index");
        
    } catch (error) {
        console.log(error)
        return res.json(error.message)
        
    }
}

export const shorten = async (req, res) => {
    try {
        let longUrl = req.body.longUrl;


        var token = await jwt.sign({longUrl:req.body.longUrl},"ABCDEFGH",{
            expiresIn: "100s"
        })

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        // const response = await fetch("http://tinyurl.com/api-create.php?url=" + longUrl);

        const response = await fetch(`http://tinyurl.com/api-create.php?url=${longUrl}`, { headers });

        const shortUrl = await response.text();

        const qrImage = qr.image(shortUrl, { type: "png" });
        const qrImageData = [];
        
        qrImage.on("data", (chunk) => {
            qrImageData.push(chunk);
        });

        qrImage.on("end", () => {
            const qrCodeBuffer = Buffer.concat(qrImageData);
            
            res.json({
                shortUrl,
                qrCode: `data:image/png;base64,${qrCodeBuffer.toString("base64")}`,
            });
        });
    } catch (error) {
        console.error(error);
        return res.json(error.message);
    }
};