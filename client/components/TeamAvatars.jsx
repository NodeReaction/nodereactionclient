import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'no-wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Chris',
    author: 'Jeon',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Eric',
    author: 'Fileti',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'James',
    author: 'Edwards',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Kunal',
    author: 'Patel',
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Michael',
    author: 'Dalton',
  }
];

/**
 * This example demonstrates the horizontal scrollable single-line grid list of images.
 */
const TeamAvatars = () => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2}>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default TeamAvatars;