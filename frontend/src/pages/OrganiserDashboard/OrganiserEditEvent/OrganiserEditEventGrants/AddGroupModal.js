import React, { useState, useCallback } from 'react';

import Stepper from 'components/generic/Stepper';

import Modal from 'components/generic/Modal';
import FilterGroupMenu from 'components/filters/FilterGroupMenu';
import TextInput from 'components/inputs/TextInput';

const AddGroupModal = ({ isOpen, onClose, onDone }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [group, setGroup] = useState();
    const [amount, setAmount] = useState(0);

    const reset = useCallback(() => {
        setActiveStep(0);
    }, []);

    const handleClose = useCallback(() => {
        reset();
        onClose();
    }, [onClose, reset]);

    const handleDone = useCallback(() => {
        onDone(group, amount);
        handleClose();
    }, [handleClose, onDone, group, amount]);

    return (
        <Modal isOpen={isOpen} handleClose={handleClose} title="Add travel grant group">
            <Stepper
                activeStep={activeStep}
                onStepChange={setActiveStep}
                onFinish={handleDone}
                steps={[
                    {
                        key: 'choose-group',
                        label: 'Choose a filter group',
                        render: () => <FilterGroupMenu showEdit={false} onSelectedChange={setGroup} />
                    },
                    {
                        key: 'enter-amount',
                        label: 'Size of travel grant',
                        render: () => (
                            <TextInput
                                value={amount}
                                onChange={setAmount}
                                label="Amount"
                                helperText="The size of travel grant you want to give to members of this group, in EUR"
                            />
                        )
                    }
                ]}
            />
        </Modal>
    );
};

export default AddGroupModal;
