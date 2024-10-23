// This component will hold the links and title for our quiz and navigation links
import {Link} from 'react';

export default function Header() {

    return (
        <div>
            <h1>Which Element Are You?</h1>
            <p>based on completely random things</p>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>
            </nav>
        </div>
    )
}