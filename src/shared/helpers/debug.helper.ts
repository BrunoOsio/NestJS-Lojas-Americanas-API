const debug = (value: any) => {
  console.log(`
    value: ${value}
    
    typeof value: ${typeof value}

    number of characters: ${value.length}
  `);
}

export default debug;