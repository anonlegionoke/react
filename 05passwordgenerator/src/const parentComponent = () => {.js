const parentComponent = () => {

    const [count, setCount] = useState(0)
    
    /* Callbacks are used when function is added as props to the child
    component. 
    
    Here, parent component updates the data & the click handling is done by child component.
    
    So we use callback to prevent re-render everytime the count is incremented*/

    const handleClick = useCallback(() => {

         setCount(count + 1)
    }, [count])

    return <childComponent onClick = {handleClick}></childComponent>

}