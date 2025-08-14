document.querySelectorAll('.template-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('templateSelector').classList.add('hidden');
    const templateId = btn.getAttribute('data-template');
    document.getElementById(templateId).classList.remove('hidden');
  });
});

/* ----------- Issue Form ----------- */
const form = document.getElementById('issueForm');
const preview = document.getElementById('preview');
const copyBtn = document.getElementById('copyBtn');
const resetBtn = document.getElementById('resetBtn');

function updatePreview() {
  const formData = new FormData(form);
  const text = `
* Account details:
- Name: ${formData.get('name') || ""}
- Phone number: ${formData.get('phone') || ""}
- Domain name or preview link: ${formData.get('domain') || ""}
- I-Case: ${formData.get('icase') || ""}

* Issue summary:
${formData.get('issueSummary') || ""}

* Expectations set with the client:
- Expected resolution: ${formData.get('expectedResolution') || ""}
- Alt Solutions Provided: ${formData.get('providedSolutions') || ""}

* Next steps:
${formData.get('nextSteps') || ""}
  `.trim();
  preview.textContent = text;
}

form.addEventListener('input', updatePreview);

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(preview.textContent).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => copyBtn.textContent = "📋 Copy to Clipboard", 1500);
  });
});

resetBtn.addEventListener('click', () => {
  form.reset();
  preview.textContent = "";
  form.closest('.template').classList.add('hidden');
  document.getElementById('templateSelector').classList.remove('hidden');
});

updatePreview();

/* ----------- LBL Change Request Form ----------- */
const lblForm = document.getElementById('lblForm');
const lblPreview = document.getElementById('lblPreview');
const lblCopyBtn = document.getElementById('lblCopyBtn');
const lblResetBtn = document.getElementById('lblResetBtn');
const addChangeBtn = document.getElementById('addChangeBtn');
const changeRequestsDiv = document.getElementById('changeRequests');

let changeCount = 1;

function createChangeField(number) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('change-request');
  wrapper.innerHTML = `
    <span class="change-label">Requested change ${number}:</span>
    <input type="text" name="changeRequest[]">
    <button type="button" class="remove-change btn-remove">🗑</button>
  `;
  wrapper.querySelector('.remove-change').addEventListener('click', () => {
    wrapper.remove();
    updateLblPreview();
    updateChangeLabels();
  });
  return wrapper;
}

function updateChangeLabels() {
  document.querySelectorAll('#changeRequests .change-request .change-label').forEach((label, i) => {
    label.textContent = `Requested change ${i + 1}:`;
  });
}

addChangeBtn.addEventListener('click', () => {
  changeCount++;
  changeRequestsDiv.appendChild(createChangeField(changeCount));
  updateLblPreview();
});

function updateLblPreview() {
  const formData = new FormData(lblForm);
  const changes = formData.getAll('changeRequest[]')
    .map((c, i) => `Requested change ${i+1}: ${c || ""}`)
    .join("\n");
  const text = `
CPROD: ${formData.get('cprod') || ""}
Body: ${formData.get('body') || ""}
Business name: ${formData.get('businessName') || ""}
${changes}
  `.trim();
  lblPreview.textContent = text;
}

lblForm.addEventListener('input', updateLblPreview);

lblCopyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(lblPreview.textContent).then(() => {
    lblCopyBtn.textContent = "✅ Copied!";
    setTimeout(() => lblCopyBtn.textContent = "📋 Copy to Clipboard", 1500);
  });
});

lblResetBtn.addEventListener('click', () => {
  lblForm.reset();
  lblPreview.textContent = "";
  changeRequestsDiv.innerHTML = "";
  changeRequestsDiv.appendChild(createChangeField(1));
  changeCount = 1;
  lblForm.closest('.template').classList.add('hidden');
  document.getElementById('templateSelector').classList.remove('hidden');
});

changeRequestsDiv.innerHTML = "";
changeRequestsDiv.appendChild(createChangeField(1));
updateLblPreview();

/* ----------- OBCX Callback Request ----------- */
const obcxForm = document.getElementById('obcxForm');
const obcxPreview = document.getElementById('obcxPreview');
const obcxCopyBtn = document.getElementById('obcxCopyBtn');
const obcxResetBtn = document.getElementById('obcxResetBtn');

function updateOBCXPreview() {
  const formData = new FormData(obcxForm);
  const text = `
Customer name: ${formData.get('customerName') || ""}
Customer contact number: ${formData.get('customerNumber') || ""}
OBCX/OB-case/Pega case number: ${formData.get('caseNumber') || ""}
OBCX agent requested: ${formData.get('agentName') || ""}
2-hour callback time frame: ${formData.get('callbackTime') || ""}
Brief Notes: ${formData.get('briefNotes') || ""}

Thank you, ${formData.get('yourName') || ""}
  `.trim();
  obcxPreview.textContent = text;
}

obcxForm.addEventListener('input', updateOBCXPreview);

obcxCopyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(obcxPreview.textContent).then(() => {
    obcxCopyBtn.textContent = "✅ Copied!";
    setTimeout(() => obcxCopyBtn.textContent = "📋 Copy to Clipboard", 1500);
  });
});

obcxResetBtn.addEventListener('click', () => {
  obcxForm.reset();
  obcxPreview.textContent = "";
  obcxForm.closest('.template').classList.add('hidden');
  document.getElementById('templateSelector').classList.remove('hidden');
});

updateOBCXPreview();
/* ----------- Refund Request ----------- */
const refundForm = document.getElementById('refundForm');
const refundPreview = document.getElementById('refundPreview');
const refundCopyBtn = document.getElementById('refundCopyBtn');
const refundResetBtn = document.getElementById('refundResetBtn');

function updateRefundPreview() {
  const formData = new FormData(refundForm);
  const text = `
URL: ${formData.get('url') || ""}
Customer Name: ${formData.get('customerName') || ""}
Reason for refund request: ${formData.get('refundReason') || ""}

Products: ${formData.get('products') || ""}
Open work-cases: ${formData.get('openCases') || ""}
  `.trim();
  refundPreview.textContent = text;
}

refundForm.addEventListener('input', updateRefundPreview);

refundCopyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(refundPreview.textContent).then(() => {
    refundCopyBtn.textContent = "✅ Copied!";
    setTimeout(() => refundCopyBtn.textContent = "📋 Copy to Clipboard", 1500);
  });
});

refundResetBtn.addEventListener('click', () => {
  refundForm.reset();
  refundPreview.textContent = "";
  refundForm.closest('.template').classList.add('hidden');
  document.getElementById('templateSelector').classList.remove('hidden');
});

updateRefundPreview();
