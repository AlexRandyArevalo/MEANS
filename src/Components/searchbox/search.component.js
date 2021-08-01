import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
library.add(faSearch);

function Search() {
    return (<div className="form-group">
        <div className="icon-addon addon-md">
            <input type="text" placeholder="Search" className="form-control w-50 search" />
            <label for="Search" className="glyphicon glyphicon-search" rel="tooltip" title="Search"><FontAwesomeIcon icon="search" /></label>
        </div>
    </div>)
}

export default Search;