const SelectBox = ({onChange, value, selectList}) => {
    return (
        <select onChange={onChange} value={value}>
            {selectList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
    );
}

export default SelectBox;