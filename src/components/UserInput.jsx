import React, { useState } from 'react';
import { calculateInvestmentResults } from '../util/investment';

export default function UserInput({onResultsUpdate}) {
    const [formValues, setFormValues] = useState({
        initialInvestment: '',
        annualInvestment: '',
        expectedReturn: '',
        duration: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const investmentResults = calculateInvestmentResults({
            initialInvestment: parseFloat(formValues.initialInvestment),
            annualInvestment: parseFloat(formValues.annualInvestment),
            expectedReturn: parseFloat(formValues.expectedReturn),
            duration: parseInt(formValues.duration, 10)
        });
        onResultsUpdate(investmentResults);
    };

    return (
        <section id="user-input">
            <form className='user-form' onSubmit={handleSubmit}>
                <div className="input-group">
                    <p>
                        <label htmlFor="initialInvestment">Initial Investment</label>
                        <input
                            type="number"
                            id="initialInvestment"
                            name="initialInvestment"
                            value={formValues.initialInvestment}
                            onChange={handleChange}
                            required
                        />
                    </p>
                    <p>
                        <label htmlFor="annualInvestment">Annual Investment</label>
                        <input
                            type="number"
                            id="annualInvestment"
                            name="annualInvestment"
                            value={formValues.annualInvestment}
                            onChange={handleChange}
                            required
                        />
                    </p>
                </div>
                <div className="input-group">
                    <p>
                        <label htmlFor="expectedReturn">Expected Return</label>
                        <input
                            type="number"
                            id="expectedReturn"
                            name="expectedReturn"
                            value={formValues.expectedReturn}
                            onChange={handleChange}
                            required
                        />
                    </p>
                    <p>
                        <label htmlFor="duration">Duration</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formValues.duration}
                            onChange={handleChange}
                            required
                        />
                    </p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}