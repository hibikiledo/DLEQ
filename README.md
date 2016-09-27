# DLEQ
DLEQ stands for **Driving License Exam Questions**

## What is DLEQ ?

DLEQ has 2 goals. 
  1. Provide theory exam questions in JSON format. 
  2. Provide a web application for practicing on exam questions.

[dlt.go.th](http://apps.dlt.go.th/e_exam/index.php) provides exam questions and answers publicly. While this is accessible, it *limits* the fun. I could not bring myself to enjoy static content with texts all over the screen. I want something that is more interactive. Sadly, I cannot find one. Since the exam was coming close, I had to painfully accepts my fate. Now that I got the license, I think I should convert those static contents into JSON or CSV. *With high hope*, I hope that awesome developers out there would make use of it. **PLEASE MAKE IT FUN! THANKS**

For testing purposes, I decided to create a web application using the data I collected. This is a simple web app with some nice little touch. You can choose # of questions from each categories and create you own exam!. There are more features coming given that I have time. You can test it here: [dleq.hibikiledo.xyz](http://dleq.hibikiledo.xyz)

## Download Dataset and Assets (JSON, CSV, Images)
- หมวด กฎหมายว่าด้วยรถยนต์ [json](https://raw.githubusercontent.com/hibikiledo/DLEQ/master/datasets/%E0%B8%81%E0%B8%8E%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%A3%E0%B8%96%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B9%8C.json) - [csv](https://raw.githubusercontent.com/hibikiledo/DLEQ/master/datasets/%E0%B8%81%E0%B8%8E%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%A3%E0%B8%96%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B9%8C.csv)
- หมวด กฎหมายว่าด้วยจราจรทางบก [json](https://raw.githubusercontent.com/hibikiledo/DLEQ/master/datasets/%E0%B8%81%E0%B8%8E%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%88%E0%B8%A3%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9A%E0%B8%81.json) - [csv](https://raw.githubusercontent.com/hibikiledo/DLEQ/master/datasets/%E0%B8%81%E0%B8%8E%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%A2%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B8%88%E0%B8%A3%E0%B8%B2%E0%B8%88%E0%B8%A3%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9A%E0%B8%81.csv)
- หมวด เครื่องหมายพื้นทาง
- หมวด ป้ายบังคับ
- หมวด ป้ายเตือน
- หมวด ป้ายแนะนำ
- หมวด มารยาทและจิตสำนึก [json](https://raw.githubusercontent.com/hibikiledo/DLEQ/master/datasets/%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%A2%E0%B8%B2%E0%B8%97%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B6%E0%B8%81.json) - [csv](https://raw.githubusercontent.com/hibikiledo/DLEQ/master/datasets/%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%A2%E0%B8%B2%E0%B8%97%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B6%E0%B8%81.csv) - [images](https://drive.google.com/open?id=0BzaX156MlOWUNVRlYlZJN18xSkE)
- หมวด เทคนิคการขับรถอย่างปลอดภัย [json](https://raw.githubusercontent.com/hibikiledo/DLEQ/master/datasets/%E0%B9%80%E0%B8%97%E0%B8%84%E0%B8%99%E0%B8%B4%E0%B8%84%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%B1%E0%B8%9A%E0%B8%A3%E0%B8%96%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%9B%E0%B8%A5%E0%B8%AD%E0%B8%94%E0%B8%A0%E0%B8%B1%E0%B8%A2.json) - [csv](https://raw.githubusercontent.com/hibikiledo/DLEQ/master/datasets/%E0%B9%80%E0%B8%97%E0%B8%84%E0%B8%99%E0%B8%B4%E0%B8%84%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%B1%E0%B8%9A%E0%B8%A3%E0%B8%96%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%9B%E0%B8%A5%E0%B8%AD%E0%B8%94%E0%B8%A0%E0%B8%B1%E0%B8%A2.csv) - [images](https://drive.google.com/open?id=0BzaX156MlOWUNDhBbXNteldVcFE)
- หมวด การบำรุงรักษารถ
- หมวด รูปภาพจราจร
- หมวด การรับรู้สถานการณ์อันตราย

## Dataset Format
Each question in the dataset shares the same format.
```json
[
   {
      "question": "ในขณะขับรถผู้ขับขี่ต้องมีเอกสารใดใช้คู่กับใบอนุญาตขับรถ",
      "choices": [
         {
            "text": "บัตรประจำตัวประชาชน",
            "correct": false
         },
         {
            "text": "สำเนาทะเบียนบ้าน",
            "correct": false
         },
         {
            "text": "สำเนาภาพถ่ายใบคู่มือจดทะเบียนรถ",
            "correct": true
         },
         {
            "text": "บัตรประกันสังคม",
            "correct": false
         }
      ],      
      "answer": "ในขณะขับรถผู้ขับขี่ต้องมีเอกสารสำเนาภาพถ่ายใบคู่มือจดทะเบียนรถใช้คู่กับใบอนุญาตขับรถ",
      "images": [],
      "category": "กฎหมายว่าด้วยรถยนต์"
   },
   ...
]
```

## Contributions
I want to make this super clear. **THIS PROJECT IS NOT FOR PROFIT.** and here is how you can help.

- Make use of the data. Make something fun, educational, and awesome.  
  If the data doesn't satisfy you, open an issue so we can discuss them.  
  
- Convert questions and answers from [dlt.go.th](http://apps.dlt.go.th/e_exam/index.php) to the format above.  
  Please contact me first so that you don't waste your time working on the same category as another person.  
  
- Find BUGS inside [dleq.hibikiledo.xyz](http://dleq.hibikiledo.xyz) and report them by opening an issue.  

- Find inconsisten information, wrong answer, typo and report them by opening an issue.

## Contact
nutsgmuic@gmail.com
I usually reply email within 24 hours. Rest assured.
