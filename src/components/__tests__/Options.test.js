//////// Options ----------------

// page renders
// start on /quiz route
// buttons appear correctly
// buttons toggle up/down when clicked
// default buttons start down, rest start up
// - button doesn't toggle when count is 0
// + button doesn't toggle when count is 100
// changing text in count changes value of count
// changing to value under 0 resets count to 0
// changing to value above 100 resets count to 100
// pressing start button moves to Question component with question data in place

const {render, screen} = require('@testing-library/react')
const App = require('../App')

it('', () => {
    render(<App />)
    expect(4).toBe(4)
    expect(screen.getByText("Trivia Quiz")).toBeInTheDocument()
})