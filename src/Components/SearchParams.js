import React, { Component } from 'react';
import {Consumer} from "./SearchContext"

class SearchParams extends Component {
    
    render() { 
        return ( 
          <Consumer>
            {context =>(              
              <div className="search-params">
                <label htmlFor="title">
                  Title
                  <input
                    id="title"
                    name="title"
                    onChange={context.handleTitleChange}
                    value={context.title}
                    placeholder="Title"                    
                  />
                </label>

                <label htmlFor="type">
                  Type
                  <select
                    id="type"
                    name="type"
                    value={context.type}
                    onChange={context.handleTypeChange}
                  >
                    <option value="">--Select--</option>
                    {context.types.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  style={{ float: "left", marginBottom: 30 }}
                  onClick={context.handleSearch}
                >
                  Search
                </button>
              </div>
            ) }
        </Consumer>
         );
    }
}
 
export default SearchParams;