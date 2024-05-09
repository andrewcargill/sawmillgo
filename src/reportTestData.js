const reportTestData = [
    {
      id: "LLPR",
      date: "2021-10-10",
      species: "Pine",
      age: 10,
      reasonForRemoval: "Reason for removal example",
      latitude: 63.8220, // Umea, Sweden
      longitude: 20.2600, 
      lumberJack: "John Doe",
      location: "Location 1",
      logs: [
        {
          id: "LLPT",
          date: "2021-10-10",
          length: 10,
          diameter: 10,
          lumberJack: "John Doe",
          milledDate: "2021-10-10T00:00:00.000Z",
          planks: [
            {
              id: "TRSE",
              milledDate: "2021-10-10",
              operator: "John Doe",
              comments: "Comments for TLLE",
              dimensions: {
                width: 10,
                depth: 10,
                length: 10,
              },
              grade: 2,
              moistureContent: [
                { value: 10, createdAt: "2021-10-10" },
                { value: 20, createdAt: "2021-10-11" },
                { value: 30, createdAt: "2021-10-12" },
                { value: 40, createdAt: "2021-10-13" },
              ],
            },
          ],
        },
        {
          id: "LLJJ",
          date: "2021-10-10",
          length: 10,
          diameter: 10,
          lumberJack: "John Doe",
          milledDate: "2021-10-10T00:00:00.000Z",
          planks: [
            {
              id: "TRLL",
              milledDate: "2021-10-10",
              operator: "John Doe",
              comments: "Comments for TLLE",
              dimensions: {
                width: 10,
                depth: 10,
                length: 10,
              },
              grade: 2,
              moistureContent: [
                { value: 10, createdAt: "2021-10-10" },
                { value: 20, createdAt: "2021-10-11" },
                { value: 30, createdAt: "2021-10-12" },
                { value: 40, createdAt: "2021-10-13" },
              ],
            },
            {
              id: "XXXX",
              operator: "John Doe",
              milledDate: "2021-10-10",
              comments: "Comments for TLLE",
              dimensions: {
                width: 10,
                depth: 10,
                length: 10,
              },
              grade: 2,
              moistureContent: [
                { value: 10, createdAt: "2021-10-10" },
                { value: 20, createdAt: "2021-10-11" },
                { value: 30, createdAt: "2021-10-12" },
                { value: 40, createdAt: "2021-10-13" },
              ],
            },
          ],
        },
      ],
    },
    // Add two more trees
    {
      id: "LLPR2",
      date: "2021-10-10",
      species: "Oak",
      age: 15,
      reasonForRemoval: "Another reason for removal",
      latitude: 63.8258, // Umea, Sweden
      longitude: 20.2630, // Umea, Sweden
      lumberJack: "Jane Smith",
      location: "Location 2",
      logs: [
        {
          id: "LLPT2",
          date: "2021-10-10",
          length: 15,
          diameter: 12,
          lumberJack: "Jane Smith",
          milledDate: "2021-10-10T00:00:00.000Z",
          planks: [
            {
              id: "TRSE2",
              milledDate: "2021-10-10",
              operator: "Jane Smith",
              comments: "Comments for TLLE2",
              dimensions: {
                width: 12,
                depth: 8,
                length: 14,
              },
              grade: 3,
              moistureContent: [
                { value: 10, createdAt: "2021-10-10" },
                { value: 20, createdAt: "2021-10-11" },
                { value: 30, createdAt: "2021-10-12" },
                { value: 40, createdAt: "2021-10-13" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "LLPR3",
      date: "2021-10-10",
      species: "Birch",
      age: 8,
      reasonForRemoval: "Yet another reason for removal",
      latitude: 63.8270, // Umea, Sweden
      longitude: 20.2650, // Umea, Sweden
      lumberJack: "Alice Johnson",
      location: "Location 3",
      logs: [
        {
          id: "LLPT3",
          date: "2021-10-10",
          length: 8,
          diameter: 6,
          lumberJack: "Alice Johnson",
          milledDate: "2021-10-10T00:00:00.000Z",
          planks: [
            {
              id: "TRSE3",
              milledDate: "2021-10-10",
              operator: "Alice Johnson",
              comments: "Comments for TLLE3",
              dimensions: {
                width: 8,
                depth: 6,
                length: 8,
              },
              grade: 1,
              moistureContent: [
                { value: 10, createdAt: "2021-10-10" },
                { value: 20, createdAt: "2021-10-11" },
                { value: 30, createdAt: "2021-10-12" },
                { value: 40, createdAt: "2021-10-13" },
              ],
            },
            {
              id: "TRXX",
              milledDate: "2021-10-10",
              operator: "Alice Johnson",
              comments: "Comments for TLLE3",
              dimensions: {
                width: 8,
                depth: 6,
                length: 8,
              },
              grade: 1,
              moistureContent: [
                { value: 10, createdAt: "2021-10-10" },
                { value: 20, createdAt: "2021-10-11" },
                { value: 30, createdAt: "2021-10-12" },
                { value: 40, createdAt: "2021-10-13" },
              ],
            },
          ],
        },
      ],
    },
  ];
  
  export default reportTestData;
  