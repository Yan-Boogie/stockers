// @flow

import gql from 'graphql-tag';

export const INDUSTRY_STICKERS = gql`
  query IndustryStickers {
    industryStickers {
      id
      industryName
      industryRiseFall
      monthRiseFallList {
        id
        dataDate
        value
      }
    }
  }
`;

const data = `{
  "stockNumber": 2330,
  "stockAlertion": "買",
  "userModulesUpdated": [{
         "moduleId": 1,
         "name": "first",
         "subName": "fist",
         "userId": 2,
         "comment": {
             "blocks": [
                 {
                     "id": "12dde25f-4578-470b-9943-b0c3b0fa85aa",
                     "meta": {
                         "GRIDS": [
                             {
                                 "name": "存貨",
                                 "rowId": "header",
                                 "columnId": 2
                             },
                             {
                                 "name": "折舊費用",
                                 "rowId": "header",
                                 "columnId": 3
                             }
                         ]
                     },
                     "type": "GRID",
                     "content": ""
                 },
                 {
                     "id": "a9dd5f05-1d50-4cb2-934e-f81fc682361b",
                     "meta": {},
                     "type": "TEXT",
                     "content": "adsfasdf:asdfsafdasdfdsfsdafasfdsdfsdfasfshifsjkfhskjfhjkshfkjh"
                 },
                 {
                     "id": "7e66351d-f629-4472-a796-10ec368ce36f",
                     "meta": {},
                     "type": "LINE",
                     "content": ""
                 }
             ]
         },
         "usingStock": [
             {
                 "rate": "30%",
                 "companyNumber": 2330
             }
         ],
         "mathModule": {
             "content": "（ 現金及約當現金  / 現金及約當現金  ) > 10%",
             "chipInfos": [
                 {
                     "TO": 10,
                     "FROM": 1,
                     "chipData": {
                         "date": null,
                         "name": "現金及約當現金",
                         "type": "GRID",
                         "rowId": 0,
                         "columnId": 1
                     }
                 },
                 {
                     "TO": 20,
                     "FROM": 11,
                     "chipData": {
                         "date": null,
                         "name": "現金及約當現金",
                         "type": "AVERAGE",
                         "rowId": "header",
                         "columnId": 1
                     }
                 }
             ]
         },
         "createdAt": "2019-10-27T15:09:20.000Z",
         "updatedAt": "2019-10-30T11:13:54.000Z",
         "headers": [
             {
                 "id": 58,
                 "headerName": "營業成本合計",
                 "parentName": "綜合損益表",
                 "moduleId": 1,
                 "columnId": 0,
                 "chipId": null,
                 "createdAt": "2019-10-30T11:07:20.000Z",
                 "updatedAt": "2019-10-30T11:07:20.000Z"
             },
             {
                 "id": 59,
                 "headerName": "除權日",
                 "parentName": "配股配息與除權息",
                 "moduleId": 1,
                 "columnId": 1,
                 "chipId": null,
                 "createdAt": "2019-10-30T11:07:20.000Z",
                 "updatedAt": "2019-10-30T11:07:20.000Z"
             },
             {
                 "id": 60,
                 "headerName": "營業費用",
                 "parentName": "綜合損益表",
                 "moduleId": 1,
                 "columnId": 2,
                 "chipId": null,
                 "createdAt": "2019-10-30T11:07:20.000Z",
                 "updatedAt": "2019-10-30T11:07:20.000Z"
             },
             {
                 "id": 61,
                 "headerName": "營業毛利（毛損）淨額",
                 "parentName": "綜合損益表",
                 "moduleId": 1,
                 "columnId": 3,
                 "chipId": null,
                 "createdAt": "2019-10-30T11:07:20.000Z",
                 "updatedAt": "2019-10-30T11:07:20.000Z"
             },
             {
                 "id": 62,
                 "headerName": "股份基礎給付酬勞成本",
                 "parentName": "現金流量表",
                 "moduleId": 1,
                 "columnId": 4,
                 "chipId": null,
                 "createdAt": "2019-10-30T11:07:20.000Z",
                 "updatedAt": "2019-10-30T11:07:20.000Z"
             }
         ]
     },
     {
         "moduleId": 2,
         "name": "second",
         "subName": "second",
         "userId": 2,
         "comment": null,
         "usingStock": [
             {
                 "rate": "70%",
                 "companyNumber": 2330
             }
         ],
         "mathModule": {
             "content": "（ 營業收入合計 - 營業成本合計  ）/ 營業收入合計  > 現金股利  ",
             "chipInfos": [
                 {
                     "TO": 9,
                     "FROM": 1,
                     "chipData": {
                         "date": null,
                         "name": "營業收入合計",
                         "type": "GRID",
                         "rowId": 0,
                         "columnId": 2
                     }
                 },
                 {
                     "TO": 18,
                     "FROM": 10,
                     "chipData": {
                         "date": null,
                         "name": "營業成本合計",
                         "type": "GRID",
                         "rowId": 0,
                         "columnId": 1
                     }
                 },
                 {
                     "TO": 28,
                     "FROM": 20,
                     "chipData": {
                         "date": null,
                         "name": "營業收入合計",
                         "type": "AVERAGE",
                         "rowId": "header",
                         "columnId": 2
                     }
                 },
                 {
                     "TO": 35,
                     "FROM": 29,
                     "chipData": {
                         "date": null,
                         "name": "現金股利",
                         "type": "GRID",
                         "rowId": 0,
                         "columnId": 0
                     }
                 }
             ]
         },
         "createdAt": "2019-10-30T11:13:54.000Z",
         "updatedAt": "2019-10-30T11:23:00.000Z",
         "headers": [
             {
                 "id": 73,
                 "headerName": "現金股利",
                 "parentName": "配股配息與除權息",
                 "moduleId": 2,
                 "columnId": 0,
                 "chipId": null,
                 "createdAt": "2019-10-30T11:21:45.000Z",
                 "updatedAt": "2019-10-30T11:21:45.000Z"
             },
             {
                 "id": 74,
                 "headerName": "營業成本合計",
                 "parentName": "綜合損益表",
                 "moduleId": 2,
                 "columnId": 2,
                 "chipId": null,
                 "createdAt": "2019-10-30T11:21:45.000Z",
                 "updatedAt": "2019-10-30T11:21:45.000Z"
             },
             {
                 "id": 75,
                 "headerName": "營業收入合計",
                 "parentName": "綜合損益表",
                 "moduleId": 2,
                 "columnId": 1,
                 "chipId": null,
                 "createdAt": "2019-10-30T11:21:45.000Z",
                 "updatedAt": "2019-10-30T11:21:45.000Z"
             }
         ]
     }]
 }`;

export const followingStocks = JSON.parse(data);

export const industryCards = [{ // industryStickers
  id: 1,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 2,
  name: '金融業',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 3,
  name: '殯葬業',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 4,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 5,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 6,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 7,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 8,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 9,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 10,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 11,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 12,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 13,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 14,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 15,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 16,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 17,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 18,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 19,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 20,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 21,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 22,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 23,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 24,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}];

export default null;
