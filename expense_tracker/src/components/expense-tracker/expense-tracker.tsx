import { useState, useEffect } from 'react';
import { Container, Navbar, Button, Alert, Table } from 'react-bootstrap';
import withLoader from '../../hoc/loader';
import AddExpense from '../add-expense';
import { getItems } from '../../services/items';
import IItem from '../../models/IItem';
import WithLoaderProps from '../../models/WithLoaderProps';

interface Props extends WithLoaderProps { };

function ExpenseTracker({ showLoader, setShowLoader }: Props) {
    const [items, setItems] = useState<IItem[]>([] as IItem[]);
    const [error, setError] = useState<Error | null>(null);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        async function fetchItems() {
            try {
                setShowLoader(true);
                const items = await getItems();
                setItems(items);
            } catch (error) {
                setError(error as Error);
            } finally {
                setShowLoader(false);
            }
        }

        fetchItems();
    }, [setShowLoader]);

    const totalAmount = () => {
        const total = items.reduce<number>((total: number, item: IItem) => {
            total += item.price;
            return total;
        }, 0);

        return total;
    };

    const totalByPayee = (payeeName: string) => {
        const total = items.reduce<number>((total: number, item: IItem) => {
            if (item.payeeName === payeeName) {
                total += item.price;
            }

            return total;
        }, 0);

        return total;
    };

    const amountToPay = () => {
        const halfOfTotal = totalAmount() / 2;
        const totalForRahul = totalByPayee('Rahul');
        const totalForRamesh = totalByPayee('Ramesh');

        if (totalForRahul > totalForRamesh) {
            return halfOfTotal - totalForRamesh;
        }

        return halfOfTotal - totalForRahul;
    };

    const handleClose = (updatedItem?: IItem) => {
        if (updatedItem) {
            setItems((items: Array<IItem>) => ([...items, updatedItem]));
        }
        setShow(false);
    };

    return (
        <Container fluid className="p-0">
            <AddExpense
                show={show}
                handleClose={handleClose}
            />
            <Navbar
                bg="dark"
                variant="dark"
                sticky="top"
            >
                <Container>
                    <Navbar.Brand>Expense Tracker</Navbar.Brand>
                    <Button
                        variant="primary"
                        onClick={() => setShow(true)}
                    >
                        Add expense
                    </Button>
                </Container>
            </Navbar>
            <Container className="my-4">
                {
                    !showLoader && error && (
                        <Alert variant="danger">{error.message}</Alert>
                    )
                }
                {
                    !showLoader && !error && (
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Payee</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th className="text-end">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items.map(
                                        (item, idx) => (
                                            <tr key={item.id}>
                                                <td>{idx + 1}</td>
                                                <td>{item.payeeName}</td>
                                                <td>{item.product}</td>
                                                <td>{item.setDate}</td>
                                                <td className="font-monospace text-end">{item.price}</td>
                                            </tr>
                                        )
                                    )
                                }
                                <tr>
                                    <td colSpan={4} className="text-end">Total Amount</td>
                                    <td className="font-monospace text-end">{totalAmount()}</td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="text-end">Rahul Paid</td>
                                    <td className="font-monospace text-end">{totalByPayee('Rahul')}</td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="text-end">Ramesh Paid</td>
                                    <td className="font-monospace text-end">{totalByPayee('Ramesh')}</td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="text-end">
                                        <strong>
                                            {
                                                totalByPayee('Rahul') > totalByPayee('Ramesh')
                                                    ? 'Pay Rahul'
                                                    : 'Pay Ramesh'
                                            }
                                        </strong>
                                    </td>
                                    <td className="font-monospace text-end">
                                        <strong>{amountToPay()}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    )
                }
            </Container>
        </Container>
    );
}

export default withLoader(ExpenseTracker);