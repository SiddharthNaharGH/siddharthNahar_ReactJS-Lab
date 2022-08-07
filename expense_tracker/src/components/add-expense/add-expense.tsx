import { useRef, FormEvent } from 'react';
import { Modal, Form, Button, Container } from 'react-bootstrap';
import withLoader from '../../hoc/loader';
import { addItem } from '../../services/items';
import IItem from '../../models/IItem';
import WithLoaderProps from '../../models/WithLoaderProps';

interface Props extends WithLoaderProps {
    show: boolean;
    backdrop?: boolean | 'static';
    animation?: boolean;
    handleClose: (updatedItem?: IItem) => void;
};

function AddExpense({ show, backdrop = 'static', animation = true, handleClose, setShowLoader }: Props) {
    const payeeNameRef = useRef<HTMLSelectElement>(null);
    const productRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);

    const addExpense = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const expense = {
            payeeName: payeeNameRef?.current?.value as string,
            product: productRef?.current?.value as string,
            price: parseFloat(priceRef?.current?.value as string) as number,
            setDate: dateRef?.current?.value as string
        } as Omit<IItem, 'id'>;

        setShowLoader(true);
        const updatedItem = await addItem(expense);
        setShowLoader(false);
        handleClose(updatedItem);
    }

    return (
        <Modal
            show={show}
            backdrop={backdrop}
            animation={animation}
        >
            <Modal.Header>
                <Modal.Title>Add an expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={addExpense}>
                    <Form.Group
                        className="mb-3"
                        controlId="payeeName"
                    >
                        <Form.Label>Who paid?</Form.Label>
                        <Form.Select
                            ref={payeeNameRef}
                            required={true}
                        >
                            <option value="">-- Select payee --</option>
                            <option value="Rahul">Rahul</option>
                            <option value="Ramesh">Ramesh</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="product"
                    >
                        <Form.Label>For what?</Form.Label>
                        <Form.Control
                            type="text"
                            ref={productRef}
                            required={true}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="price"
                    >
                        <Form.Label>How much?</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            ref={priceRef}
                            required={true}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="date"
                    >
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            ref={dateRef}
                            required={true}
                        />
                    </Form.Group>

                    <Container className="text-end p-0">
                        <Button
                            variant="secondary"
                            onClick={() => handleClose()}
                        >
                            Close
                        </Button>
                        {' '}
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Add expense
                        </Button>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default withLoader(AddExpense);