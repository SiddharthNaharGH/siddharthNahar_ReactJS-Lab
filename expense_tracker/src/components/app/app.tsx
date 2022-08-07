import { Routes, Route, useNavigate } from 'react-router-dom';
import ExpenseTracker from '../expense-tracker';
import AddExpense from '../add-expense';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
	const navigate = useNavigate();

	return (
		<Routes>
			<Route
				path="/"
				element={
					<ExpenseTracker />
				}
			/>
			<Route
				path="add"
				element={
					<AddExpense
						show={true}
						backdrop={false}
						animation={false}
						handleClose={() => navigate('/')}
					/>
				}
			/>
		</Routes>
	);
}