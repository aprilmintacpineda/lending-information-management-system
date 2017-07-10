import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import WithSidebar from '../../components/WithSidebar';
// helpers
import { ucfirst } from '../../helpers/Strings';

class Dashboard extends Component {
  componentWillMount() {
    document.title = 'Dashboard - Lending Information System';
  }

  render() {
    return (
      <WithSidebar>
        <p>Phasellus maximus velit sed libero auctor vestibulum. Morbi aliquam tempus arcu at rutrum. Aenean posuere commodo tortor non elementum. Vivamus commodo ante non tellus scelerisque, ut imperdiet ex vestibulum. Pellentesque vehicula mi quis sem auctor, sit amet mollis leo bibendum. Aliquam erat volutpat. Nam non lacus sit amet nulla suscipit finibus at id nisl. Praesent vitae porttitor odio. Curabitur tincidunt lorem at augue efficitur elementum. Vivamus sit amet lacus nibh.</p>
        <p>Praesent quis efficitur dolor, id volutpat arcu. Suspendisse pretium est ultricies enim suscipit porttitor. Sed justo nunc, maximus sed nisi vel, fermentum molestie lorem. Suspendisse nec sem in purus dictum rutrum. Mauris ut lacinia ligula. Phasellus placerat, magna quis dignissim mattis, massa mi interdum turpis, eu rhoncus orci elit sed dolor. Vivamus vel lacus urna. Phasellus vitae nulla quis augue hendrerit interdum. Donec efficitur risus sit amet eros ultricies, at porttitor diam fermentum. Donec eleifend dictum nibh. Phasellus ac libero interdum, tristique ligula ut, maximus justo.</p>
        <p>Mauris in dolor vel dui tincidunt auctor. Integer vitae orci non urna commodo fermentum vel a nibh. Vivamus eget magna aliquet, ornare metus sit amet, maximus lorem. Vivamus eu ligula malesuada, ultrices ante eget, semper lacus. Donec malesuada sit amet neque quis pharetra. Phasellus sollicitudin urna ac nunc pellentesque, eu hendrerit risus pretium. Sed tempor risus sed lorem iaculis facilisis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
        <p>Proin eleifend venenatis tempor. Ut consectetur feugiat nibh, non blandit mi bibendum nec. Nulla quis malesuada leo. Sed in pretium quam. Donec dapibus magna lorem. Donec sollicitudin sit amet risus a tempus. Nullam at elementum eros. Morbi auctor sagittis ligula. Ut dapibus libero vitae ex congue, sit amet euismod magna euismod. Integer iaculis eget sapien at finibus. Nulla sit amet libero in lacus elementum imperdiet eu eu libero. Sed lectus nunc, ultrices et purus sit amet, semper porttitor leo. Sed eu nisi commodo, commodo magna vel, fermentum nisi. Cras at scelerisque risus. Suspendisse ac enim at ipsum pellentesque sodales ut imperdiet ligula. Fusce magna lectus, mollis in volutpat congue, cursus et risus.</p>
        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin est sapien, interdum vitae est id, hendrerit placerat nibh. Proin hendrerit commodo ipsum, non laoreet metus fringilla quis. Proin arcu nisl, luctus et volutpat sit amet, lacinia malesuada leo. Suspendisse potenti. Praesent aliquam lectus tortor, molestie luctus nisl tincidunt at. Curabitur facilisis consequat massa a tristique. Sed vitae lectus vel elit tincidunt rutrum in at est. Etiam fermentum sem ligula, non vulputate magna ultrices nec. Integer fermentum malesuada ante sit amet luctus. Mauris massa nunc, pulvinar quis fringilla sit amet, euismod ut turpis. Pellentesque eget libero nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam nec diam a dolor bibendum gravida.</p>
      </WithSidebar>
    );
  }
}

export default connect(store => ({
  session: {...store.session}
}), {

})(Dashboard);