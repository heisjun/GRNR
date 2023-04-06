import { useState } from 'react';

function App() {
    const [items, setItems] = useState([
        { type: 'button', value: 'Button 1' },
        { type: 'text', value: 'Input 1' },
    ]);

    const handleDelete = (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    {item.type === 'button' ? (
                        <button onClick={() => handleDelete(index)}>{item.value}</button>
                    ) : (
                        <div>{item.value}</div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default App;
