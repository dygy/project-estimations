import { PDFDocument } from "pdf-lib";
import { estimation } from "../types/estimations";

export async function createPdf(estimation: estimation) {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([550, 750]);

  const form = pdfDoc.getForm();

  page.drawText("Client name:", { x: 50, y: 700, size: 12 });
  const clientNameField = form.createTextField("ClientName");
  clientNameField.setText(estimation.client);
  clientNameField.addToPage(page, { x: 50, y: 680, height: 16 });

  page.drawText("Project name:", { x: 50, y: 650, size: 12 });
  const projectNameField = form.createTextField("ProjectName");
  projectNameField.setText(estimation.project);
  projectNameField.addToPage(page, { x: 50, y: 630, height: 16 });

  page.drawText("Planned total time:", { x: 50, y: 600, size: 12 });
  const timeField = form.createTextField("TimeField");
  timeField.setText(estimation.time);
  timeField.addToPage(page, { x: 50, y: 580, height: 16 });

  page.drawText("Requirements:", { x: 50, y: 550, size: 12 });
  const tableHeight = estimation.requirements.length * 18;
  const tableY = 530 - estimation.requirements.length * 18;

  const requirementsList = form.createOptionList("requirements");
  requirementsList.addOptions(
    estimation.requirements.map((_, index) => ` ${index + 1}.`)
  );
  requirementsList.addToPage(page, {
    x: 50,
    y: tableY,
    height: tableHeight,
    width: 25,
  });

  const requirementsTextList = form.createOptionList("requirementsText");
  requirementsTextList.addOptions(
    estimation.requirements.map((elem) => elem.text)
  );
  requirementsTextList.addToPage(page, {
    x: 75,
    y: tableY,
    height: tableHeight,
    width: 200,
  });

  const requirementsTimeList = form.createOptionList("requirementsTime");
  requirementsTimeList.addOptions(
    estimation.requirements.map((elem) => ` ${elem.hours} `)
  );
  requirementsTimeList.addToPage(page, {
    x: 275,
    y: tableY,
    height: tableHeight,
    width: 25,
  });

  downloadBlob(
    await pdfDoc.save(),
    `${estimation.client}_${estimation.project}`,
    "application/pdf"
  );
}

const downloadBlob = (data: Uint8Array, fileName: string, mimeType: string) => {
  const blob = new Blob([data], {
    type: mimeType,
  });
  const url = window.URL.createObjectURL(blob);
  downloadURL(url, fileName);
  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};

const downloadURL = (data: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style.display = "none";
  a.click();
  a.remove();
};
