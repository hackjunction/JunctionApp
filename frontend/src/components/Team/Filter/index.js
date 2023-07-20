import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'components/inputs/Select'
import Button from 'components/generic/Button'

export default ({ filterArray = [], noFilterOption = 'All' }) => {
    const [filter, setFilter] = useState(noFilterOption)

    const handleChange = event => {
        setFilter(event.target.value)
    }

    const resetFilters = () => {
        setFilter(noFilterOption)
    }
    return (
        <div>
            <Select
                value={filter}
                options={filterArray}
                onChange={handleChange}
            />
            {/* <Select value={challengeFilter} onChange={handleChallengeChange}>
            {challenges.map((challenge, index) => (
              <option key={index} value={challenge.name}>
                {challenge.name}
              </option>
            ))}
      </Select> */}
            <Button onClick={resetFilters}>Reset filter</Button>
        </div>
    )
}

// function CategorySelector() {
//   const dispatch = useDispatch();
//   const { categories, categoryFilter } = useSelector((store) => store.categories);

//   const handleSelectChange = (event) => {
//     dispatch(applyFilter(event.target.value));
//   };
//   return (
//     <select className="px-2 pb-1 pt-2 text-sky-900 bg-white" value={categoryFilter} onChange={handleSelectChange}>
//       {categories.map((category) => (
//         <option key={category} value={category}>
//           {category}
//         </option>
//       ))}
//     </select>
//   );
// }
