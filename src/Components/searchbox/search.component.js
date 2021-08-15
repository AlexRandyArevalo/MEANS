import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

library.add(faSearch);

export default class Search extends Component {
    render() {
        return (<div className="form-group w-50">
            <ReactSearchAutocomplete
                items={this.props.items}
                onSelect={this.props.onselect}
                onClear={this.props.onclear}
                fuseOptions={this.props.fuseoptions}
                styling={{
                    height: "40px",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    boxShadow: "none",
                    hoverBackgroundColor: "#9500f31f",
                    fontSize: "12px",
                    iconColor: "#9600f3b0",
                    clearIconMargin: "3px 8px 0 0",
                }}
            />
        </div>)
    }
}