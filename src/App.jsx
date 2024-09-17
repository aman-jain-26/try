import { Link } from 'react-router-dom';

function App() {
    return (
        <>
            <h1> React query</h1>
            <div>
                <Link to="/">Home</Link> <br />
                <Link to="/products">Products</Link>
            </div>
        </>
    );
}

export default App;
