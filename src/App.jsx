import ExpenseRequestForm from "./components/ExpenseRequestForm";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-10 py-5 text-lg font-semibold">
        Expense Request
      </header>

      {/* Content */}
      <main className="p-10">
        <ExpenseRequestForm />
      </main>
    </div>
  );
}

export default App;
