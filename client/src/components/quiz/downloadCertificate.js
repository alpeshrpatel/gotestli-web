import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadCertificate = async (
  studentName,
  score,
  level,
  quizTitle,category
) => {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  };
  const currentDate = new Date().toLocaleDateString("en-US", dateOptions);
  const doc = new jsPDF("landscape", "pt", "a4");

  
  const image = new Image();
  image.src = "/assets/img/certificate/certificate.png";
  image.onload = () => {
   
    doc.addImage(image, "PNG", 0, 0, 842, 595); 

    
    doc.setFont("Georgia", "normal"); 

    
    doc.setFontSize(36);
    doc.setTextColor(0, 51, 102); 
    doc.text("CERTIFICATE", 421, 120, "center");
    doc.text("of Completion", 421, 160, "center");

   
    doc.setFontSize(18);
    doc.text("This certificate is proudly presented to:", 421, 210, "center");

    
    doc.setFont("Georgia", "bold");
    doc.setFontSize(28);
    doc.text(studentName, 421, 270, "center"); 

    
    const startX = 150;
    const endX = 700;
    const y = 275; 
    const segmentLength = 5;
    for (let x = startX; x < endX; x += segmentLength * 2) {
      doc.line(x, y, x + segmentLength, y); 
    }
    
    doc.setFont("Georgia", "normal");
    doc.setFontSize(16);
    doc.text(`For successfully completing the`, 421, 320, "center");

    doc.setFont("Georgia", "bold");
    doc.text(`${quizTitle} quiz`, 421, 350, "center"); 

    doc.setFont("Georgia", "normal");
    doc.text(
      "With an exceptional performance, achieving a score of",
      421,
      380,
      "center"
    );

    doc.setFont("Georgia", "bold");
    doc.text(`${score}%`, 421, 410, "center"); 

    doc.setFont("Georgia", "normal");
    doc.text(
      `in the ${category} quiz at the ${level} level.`,
      421,
      435,
      "center"
    );

   
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50); 
    doc.text("Awarded on:", 150, 490);
    doc.setFont("Georgia", "bold");
    doc.text(currentDate, 250, 490);

    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50); 
    doc.text("Instructor:", 150, 510);
    doc.setFont("Georgia", "bold");
    doc.text(studentName, 250, 510);

    
    doc.setFontSize(16);
    doc.setFont("Georgia", "bold");
    doc.setTextColor(0, 0, 0); 

    doc.text("Alpesh Patel", 421, 550, "center"); 
    doc.setFont("Georgia", "normal");
    doc.text("Team GoTestli", 421, 570, "center"); 

    // doc.setFont('Georgia', 'bold');
    // doc.text('Itsuki Takahashi', 650, 550); // Instructor signature
    // doc.setFont('Georgia', 'normal');
    // doc.text('Name of Instructor', 650, 570); // Instructor title

   
    doc.save(`${studentName}_certificate.pdf`);
  };

  
  image.onerror = () => {
    console.error("Could not load the certificate image. Check the path.");
  };
};
