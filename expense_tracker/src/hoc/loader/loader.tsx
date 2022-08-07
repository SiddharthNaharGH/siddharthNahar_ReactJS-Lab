import { useState, useCallback, ComponentType } from 'react';
import { Spinner } from 'react-bootstrap';
import WithLoaderProps from '../../models/WithLoaderProps';
import './loader.css';

export default function withLoader<T extends WithLoaderProps>(WrappedComponent: ComponentType<T>) {
    return function (props: Omit<T, keyof WithLoaderProps>) {
        const [showLoader, setShowLoader] = useState<boolean>(false);

        return (
            <>
                <WrappedComponent
                    {...(props as T)}
                    showLoader={showLoader}
                    setShowLoader={useCallback((showLoader: boolean) => setShowLoader(showLoader), [])}
                />
                {showLoader && (
                    <div className="loader-container d-flex justify-content-center align-items-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )}
            </>
        );
    }
}