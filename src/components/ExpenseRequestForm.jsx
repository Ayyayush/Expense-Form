import { useState } from "react";

export default function ExpenseRequestForm() {
  const [base, setBase] = useState(25000);
  const [gst, setGst] = useState(18);
  const [tds, setTds] = useState(2500);

  const gstAmount = (base * gst) / 100;
  const grandTotal = base + gstAmount - tds;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* MAIN DOCUMENT */}
      <div className="lg:col-span-8 bg-white rounded-xl border shadow-sm p-6 sm:p-8">

        {/* META HEADER */}
        <div className="flex flex-wrap gap-6 pb-6 border-b text-sm">
          <Meta label="ER No" value="ER-000123" />
          <Meta label="PO No" value="PO-45789" />
          <Meta label="Vendor" value="ABC Suppliers Pvt Ltd" />
          <Meta label="Created By" value="Purchase Manager" />
        </div>

        {/* CLASSIFICATION */}
        <Section title="Expense Classification">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Cell label="Expense Head" value="Office Rent" />
            <Cell label="Expense Type" value="Fixed" />
            <Cell label="Type of Expense" value="Operational" />
          </div>
        </Section>

        {/* AMOUNT TABLE */}
        <Section title="Amount Details">
          <table className="w-full text-sm">
            <tbody>
              <EditableRow
                label="Base Amount"
                value={base}
                prefix="₹"
                onChange={setBase}
              />
              <EditableRow
                label="GST (%)"
                value={gst}
                suffix="%"
                onChange={setGst}
              />
              <EditableRow
                label="TDS"
                value={tds}
                prefix="₹"
                onChange={setTds}
              />
              <tr className="border-t">
                <td className="py-3 font-semibold text-gray-700">
                  Grand Total
                </td>
                <td className="py-3 text-right font-semibold text-blue-600">
                  ₹ {grandTotal.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        {/* INSTALLMENTS */}
        <Section title="Installments">
          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left py-2">#</th>
                <th className="text-left py-2">Due Date</th>
                <th className="text-right py-2">Amount</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <InstallmentRow no="1" date="10 Oct 2026" amount="₹ 10,000" />
              <InstallmentRow no="2" date="10 Nov 2026" amount="₹ 17,000" />
            </tbody>
          </table>

          <p className="mt-3 text-xs text-amber-700">
            ⚠ First installment approval is mandatory for Expense Request approval
          </p>
        </Section>
      </div>

      {/* SUMMARY PANEL */}
      <aside className="lg:col-span-4 sticky top-6 h-fit bg-white rounded-xl border shadow-sm p-6">
        <h3 className="text-xs font-semibold text-gray-500 mb-4">
          SUMMARY
        </h3>

        <div className="mb-6">
          <p className="text-xs text-gray-500">Total Payable</p>
          <p className="text-2xl font-semibold text-blue-600">
            ₹ {grandTotal.toLocaleString()}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">Approval Flow</p>
          <p className="text-sm text-gray-700">
            Verifier → Manager Finance
          </p>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Submit for Approval
        </button>
        <button className="w-full mt-2 border py-2 rounded-lg hover:bg-gray-50">
          Save Draft
        </button>
      </aside>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-8">
      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Cell({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

function EditableRow({ label, value, onChange, prefix, suffix }) {
  return (
    <tr className="border-b">
      <td className="py-3 text-gray-600">{label}</td>
      <td className="py-3 text-right">
        <span className="text-gray-400 mr-1">{prefix}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-24 text-right border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <span className="text-gray-400 ml-1">{suffix}</span>
      </td>
    </tr>
  );
}

function InstallmentRow({ no, date, amount }) {
  return (
    <tr className="border-t">
      <td className="py-3">{no}</td>
      <td className="py-3">{date}</td>
      <td className="py-3 text-right">{amount}</td>
      <td className="py-3">
        <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
          Pending
        </span>
      </td>
    </tr>
  );
}
