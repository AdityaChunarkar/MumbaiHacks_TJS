import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/signup/signup.jsx";    
import Home from "./components/home.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import Detailpg from "./components/details/Detailpg.jsx";
import DetailpgTwo from "./components/details/DetailpgTwo.jsx";
import Detailspf from "./components/details/detailspf.jsx";
import Investment from "./components/investment/Investment.jsx";
import Income from "./components/Income/Income.jsx";
import Saving from "./components/savings/Saving.jsx";
import Spending from "./components/spendings/Spending.jsx";
import Chatbot from "./components/gimini/Chatbot.jsx";
import TaxPage from "./components/tax/TaxPage.jsx";
import BudgetPlanningTools from "./components/buget/BudgetPlanningTools.jsx";
import AIShowcase from "./components/AIShowcase.jsx";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/details" element={<Detailpg />} />
                    <Route path="/detailstwo" element={<DetailpgTwo />} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/detailspf" element={<Detailspf />} />
                    <Route path="/investment" element={<Investment />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/savings" element={<Saving/>}  />
                    <Route path="/spendings" element={<Spending/>} />
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/taxpage" element={<TaxPage />} />
                    <Route path="/budgetplanningtools" element={<BudgetPlanningTools />} />
                    <Route path="/aishowcase" element={<AIShowcase />} />
                </Routes>
        </BrowserRouter>
    );
};

export default App;

