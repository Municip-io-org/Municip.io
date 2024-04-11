/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 2213.0, "minX": 0.0, "maxY": 12998.0, "series": [{"data": [[0.0, 2213.0], [0.1, 2213.0], [0.2, 2213.0], [0.3, 2213.0], [0.4, 2291.0], [0.5, 2291.0], [0.6, 2291.0], [0.7, 2291.0], [0.8, 2330.0], [0.9, 2330.0], [1.0, 2330.0], [1.1, 2330.0], [1.2, 2330.0], [1.3, 2636.0], [1.4, 2636.0], [1.5, 2636.0], [1.6, 3147.0], [1.7, 3147.0], [1.8, 3147.0], [1.9, 3147.0], [2.0, 3318.0], [2.1, 3318.0], [2.2, 3318.0], [2.3, 3318.0], [2.4, 3379.0], [2.5, 3379.0], [2.6, 3379.0], [2.7, 3379.0], [2.8, 3490.0], [2.9, 3490.0], [3.0, 3490.0], [3.1, 3490.0], [3.2, 3877.0], [3.3, 3877.0], [3.4, 3877.0], [3.5, 3877.0], [3.6, 3967.0], [3.7, 3967.0], [3.8, 3967.0], [3.9, 3967.0], [4.0, 4461.0], [4.1, 4461.0], [4.2, 4461.0], [4.3, 4461.0], [4.4, 4650.0], [4.5, 4650.0], [4.6, 4650.0], [4.7, 4650.0], [4.8, 5152.0], [4.9, 5152.0], [5.0, 5152.0], [5.1, 5152.0], [5.2, 5162.0], [5.3, 5162.0], [5.4, 5162.0], [5.5, 5162.0], [5.6, 5162.0], [5.7, 5234.0], [5.8, 5234.0], [5.9, 5234.0], [6.0, 5234.0], [6.1, 5251.0], [6.2, 5251.0], [6.3, 5251.0], [6.4, 5251.0], [6.5, 5304.0], [6.6, 5304.0], [6.7, 5304.0], [6.8, 5304.0], [6.9, 5474.0], [7.0, 5474.0], [7.1, 5474.0], [7.2, 5474.0], [7.3, 5620.0], [7.4, 5620.0], [7.5, 5620.0], [7.6, 5620.0], [7.7, 5913.0], [7.8, 5913.0], [7.9, 5913.0], [8.0, 5913.0], [8.1, 5916.0], [8.2, 5916.0], [8.3, 5916.0], [8.4, 5916.0], [8.5, 6031.0], [8.6, 6031.0], [8.7, 6031.0], [8.8, 6031.0], [8.9, 6058.0], [9.0, 6058.0], [9.1, 6058.0], [9.2, 6058.0], [9.3, 6136.0], [9.4, 6136.0], [9.5, 6136.0], [9.6, 6136.0], [9.7, 6407.0], [9.8, 6407.0], [9.9, 6407.0], [10.0, 6407.0], [10.1, 6513.0], [10.2, 6513.0], [10.3, 6513.0], [10.4, 6513.0], [10.5, 6544.0], [10.6, 6544.0], [10.7, 6544.0], [10.8, 6544.0], [10.9, 6830.0], [11.0, 6830.0], [11.1, 6830.0], [11.2, 6830.0], [11.3, 6842.0], [11.4, 6842.0], [11.5, 6842.0], [11.6, 6842.0], [11.7, 7307.0], [11.8, 7307.0], [11.9, 7307.0], [12.0, 7307.0], [12.1, 7323.0], [12.2, 7323.0], [12.3, 7323.0], [12.4, 7323.0], [12.5, 7333.0], [12.6, 7333.0], [12.7, 7333.0], [12.8, 7333.0], [12.9, 7572.0], [13.0, 7572.0], [13.1, 7572.0], [13.2, 7572.0], [13.3, 7622.0], [13.4, 7622.0], [13.5, 7622.0], [13.6, 7622.0], [13.7, 7819.0], [13.8, 7819.0], [13.9, 7819.0], [14.0, 7819.0], [14.1, 7821.0], [14.2, 7821.0], [14.3, 7821.0], [14.4, 7821.0], [14.5, 7826.0], [14.6, 7826.0], [14.7, 7826.0], [14.8, 7826.0], [14.9, 7833.0], [15.0, 7833.0], [15.1, 7833.0], [15.2, 7833.0], [15.3, 7843.0], [15.4, 7843.0], [15.5, 7843.0], [15.6, 7843.0], [15.7, 8055.0], [15.8, 8055.0], [15.9, 8055.0], [16.0, 8055.0], [16.1, 8132.0], [16.2, 8132.0], [16.3, 8132.0], [16.4, 8132.0], [16.5, 8143.0], [16.6, 8143.0], [16.7, 8143.0], [16.8, 8143.0], [16.9, 8197.0], [17.0, 8197.0], [17.1, 8197.0], [17.2, 8197.0], [17.3, 8230.0], [17.4, 8230.0], [17.5, 8230.0], [17.6, 8423.0], [17.7, 8423.0], [17.8, 8423.0], [17.9, 8423.0], [18.0, 8479.0], [18.1, 8479.0], [18.2, 8479.0], [18.3, 8479.0], [18.4, 8481.0], [18.5, 8481.0], [18.6, 8481.0], [18.7, 8481.0], [18.8, 8531.0], [18.9, 8531.0], [19.0, 8531.0], [19.1, 8531.0], [19.2, 8555.0], [19.3, 8555.0], [19.4, 8555.0], [19.5, 8555.0], [19.6, 8561.0], [19.7, 8561.0], [19.8, 8561.0], [19.9, 8561.0], [20.0, 8589.0], [20.1, 8589.0], [20.2, 8589.0], [20.3, 8589.0], [20.4, 8608.0], [20.5, 8608.0], [20.6, 8608.0], [20.7, 8608.0], [20.8, 8624.0], [20.9, 8624.0], [21.0, 8624.0], [21.1, 8624.0], [21.2, 8649.0], [21.3, 8649.0], [21.4, 8649.0], [21.5, 8649.0], [21.6, 8665.0], [21.7, 8665.0], [21.8, 8665.0], [21.9, 8665.0], [22.0, 8686.0], [22.1, 8686.0], [22.2, 8686.0], [22.3, 8686.0], [22.4, 8752.0], [22.5, 8752.0], [22.6, 8752.0], [22.7, 8752.0], [22.8, 9042.0], [22.9, 9042.0], [23.0, 9042.0], [23.1, 9042.0], [23.2, 9127.0], [23.3, 9127.0], [23.4, 9127.0], [23.5, 9127.0], [23.6, 9138.0], [23.7, 9138.0], [23.8, 9138.0], [23.9, 9138.0], [24.0, 9140.0], [24.1, 9140.0], [24.2, 9140.0], [24.3, 9140.0], [24.4, 9148.0], [24.5, 9148.0], [24.6, 9148.0], [24.7, 9148.0], [24.8, 9155.0], [24.9, 9155.0], [25.0, 9155.0], [25.1, 9155.0], [25.2, 9158.0], [25.3, 9158.0], [25.4, 9158.0], [25.5, 9158.0], [25.6, 9167.0], [25.7, 9167.0], [25.8, 9167.0], [25.9, 9167.0], [26.0, 9194.0], [26.1, 9194.0], [26.2, 9194.0], [26.3, 9194.0], [26.4, 9279.0], [26.5, 9279.0], [26.6, 9279.0], [26.7, 9279.0], [26.8, 9332.0], [26.9, 9332.0], [27.0, 9332.0], [27.1, 9332.0], [27.2, 9332.0], [27.3, 9332.0], [27.4, 9332.0], [27.5, 9332.0], [27.6, 9352.0], [27.7, 9352.0], [27.8, 9352.0], [27.9, 9352.0], [28.0, 9508.0], [28.1, 9508.0], [28.2, 9508.0], [28.3, 9508.0], [28.4, 9539.0], [28.5, 9539.0], [28.6, 9539.0], [28.7, 9539.0], [28.8, 9776.0], [28.9, 9776.0], [29.0, 9776.0], [29.1, 9776.0], [29.2, 9794.0], [29.3, 9794.0], [29.4, 9794.0], [29.5, 9794.0], [29.6, 9813.0], [29.7, 9813.0], [29.8, 9813.0], [29.9, 9813.0], [30.0, 9878.0], [30.1, 9878.0], [30.2, 9878.0], [30.3, 9878.0], [30.4, 9887.0], [30.5, 9887.0], [30.6, 9887.0], [30.7, 9887.0], [30.8, 9909.0], [30.9, 9909.0], [31.0, 9909.0], [31.1, 9909.0], [31.2, 9953.0], [31.3, 9953.0], [31.4, 9953.0], [31.5, 9953.0], [31.6, 9968.0], [31.7, 9968.0], [31.8, 9968.0], [31.9, 9968.0], [32.0, 9974.0], [32.1, 9974.0], [32.2, 9974.0], [32.3, 9974.0], [32.4, 9981.0], [32.5, 9981.0], [32.6, 9981.0], [32.7, 9981.0], [32.8, 10033.0], [32.9, 10033.0], [33.0, 10033.0], [33.1, 10033.0], [33.2, 10046.0], [33.3, 10046.0], [33.4, 10046.0], [33.5, 10046.0], [33.6, 10070.0], [33.7, 10070.0], [33.8, 10070.0], [33.9, 10070.0], [34.0, 10094.0], [34.1, 10094.0], [34.2, 10094.0], [34.3, 10094.0], [34.4, 10248.0], [34.5, 10248.0], [34.6, 10248.0], [34.7, 10248.0], [34.8, 10251.0], [34.9, 10251.0], [35.0, 10251.0], [35.1, 10251.0], [35.2, 10264.0], [35.3, 10264.0], [35.4, 10264.0], [35.5, 10264.0], [35.6, 10269.0], [35.7, 10269.0], [35.8, 10269.0], [35.9, 10269.0], [36.0, 10272.0], [36.1, 10272.0], [36.2, 10272.0], [36.3, 10272.0], [36.4, 10348.0], [36.5, 10348.0], [36.6, 10348.0], [36.7, 10348.0], [36.8, 10355.0], [36.9, 10355.0], [37.0, 10355.0], [37.1, 10355.0], [37.2, 10384.0], [37.3, 10384.0], [37.4, 10384.0], [37.5, 10384.0], [37.6, 10393.0], [37.7, 10393.0], [37.8, 10393.0], [37.9, 10393.0], [38.0, 10407.0], [38.1, 10407.0], [38.2, 10407.0], [38.3, 10407.0], [38.4, 10444.0], [38.5, 10444.0], [38.6, 10444.0], [38.7, 10444.0], [38.8, 10453.0], [38.9, 10453.0], [39.0, 10453.0], [39.1, 10453.0], [39.2, 10455.0], [39.3, 10455.0], [39.4, 10455.0], [39.5, 10455.0], [39.6, 10463.0], [39.7, 10463.0], [39.8, 10463.0], [39.9, 10463.0], [40.0, 10471.0], [40.1, 10471.0], [40.2, 10471.0], [40.3, 10471.0], [40.4, 10472.0], [40.5, 10472.0], [40.6, 10472.0], [40.7, 10472.0], [40.8, 10480.0], [40.9, 10480.0], [41.0, 10480.0], [41.1, 10480.0], [41.2, 10484.0], [41.3, 10484.0], [41.4, 10484.0], [41.5, 10484.0], [41.6, 10487.0], [41.7, 10487.0], [41.8, 10487.0], [41.9, 10487.0], [42.0, 10494.0], [42.1, 10494.0], [42.2, 10494.0], [42.3, 10494.0], [42.4, 10494.0], [42.5, 10494.0], [42.6, 10494.0], [42.7, 10494.0], [42.8, 10499.0], [42.9, 10499.0], [43.0, 10499.0], [43.1, 10499.0], [43.2, 10505.0], [43.3, 10505.0], [43.4, 10505.0], [43.5, 10505.0], [43.6, 10509.0], [43.7, 10509.0], [43.8, 10509.0], [43.9, 10509.0], [44.0, 10512.0], [44.1, 10512.0], [44.2, 10512.0], [44.3, 10512.0], [44.4, 10520.0], [44.5, 10520.0], [44.6, 10520.0], [44.7, 10520.0], [44.8, 10531.0], [44.9, 10531.0], [45.0, 10531.0], [45.1, 10531.0], [45.2, 10543.0], [45.3, 10543.0], [45.4, 10543.0], [45.5, 10543.0], [45.6, 10548.0], [45.7, 10548.0], [45.8, 10548.0], [45.9, 10548.0], [46.0, 10577.0], [46.1, 10577.0], [46.2, 10577.0], [46.3, 10577.0], [46.4, 10581.0], [46.5, 10581.0], [46.6, 10581.0], [46.7, 10581.0], [46.8, 10608.0], [46.9, 10608.0], [47.0, 10608.0], [47.1, 10608.0], [47.2, 10618.0], [47.3, 10618.0], [47.4, 10618.0], [47.5, 10618.0], [47.6, 10619.0], [47.7, 10619.0], [47.8, 10619.0], [47.9, 10619.0], [48.0, 10620.0], [48.1, 10620.0], [48.2, 10620.0], [48.3, 10620.0], [48.4, 10622.0], [48.5, 10622.0], [48.6, 10622.0], [48.7, 10622.0], [48.8, 10631.0], [48.9, 10631.0], [49.0, 10631.0], [49.1, 10631.0], [49.2, 10639.0], [49.3, 10639.0], [49.4, 10639.0], [49.5, 10639.0], [49.6, 10644.0], [49.7, 10644.0], [49.8, 10644.0], [49.9, 10644.0], [50.0, 10654.0], [50.1, 10654.0], [50.2, 10654.0], [50.3, 10654.0], [50.4, 10659.0], [50.5, 10659.0], [50.6, 10659.0], [50.7, 10659.0], [50.8, 10665.0], [50.9, 10665.0], [51.0, 10665.0], [51.1, 10665.0], [51.2, 10666.0], [51.3, 10666.0], [51.4, 10666.0], [51.5, 10666.0], [51.6, 10670.0], [51.7, 10670.0], [51.8, 10670.0], [51.9, 10670.0], [52.0, 10703.0], [52.1, 10703.0], [52.2, 10703.0], [52.3, 10703.0], [52.4, 10733.0], [52.5, 10733.0], [52.6, 10733.0], [52.7, 10733.0], [52.8, 10735.0], [52.9, 10735.0], [53.0, 10735.0], [53.1, 10735.0], [53.2, 10765.0], [53.3, 10765.0], [53.4, 10765.0], [53.5, 10765.0], [53.6, 10813.0], [53.7, 10813.0], [53.8, 10813.0], [53.9, 10813.0], [54.0, 10839.0], [54.1, 10839.0], [54.2, 10839.0], [54.3, 10839.0], [54.4, 10855.0], [54.5, 10855.0], [54.6, 10855.0], [54.7, 10855.0], [54.8, 10886.0], [54.9, 10886.0], [55.0, 10886.0], [55.1, 10886.0], [55.2, 10924.0], [55.3, 10924.0], [55.4, 10924.0], [55.5, 10924.0], [55.6, 10950.0], [55.7, 10950.0], [55.8, 10950.0], [55.9, 10950.0], [56.0, 10951.0], [56.1, 10951.0], [56.2, 10951.0], [56.3, 10951.0], [56.4, 11001.0], [56.5, 11001.0], [56.6, 11001.0], [56.7, 11001.0], [56.8, 11003.0], [56.9, 11003.0], [57.0, 11003.0], [57.1, 11003.0], [57.2, 11012.0], [57.3, 11012.0], [57.4, 11012.0], [57.5, 11012.0], [57.6, 11017.0], [57.7, 11017.0], [57.8, 11017.0], [57.9, 11017.0], [58.0, 11018.0], [58.1, 11018.0], [58.2, 11018.0], [58.3, 11018.0], [58.4, 11019.0], [58.5, 11019.0], [58.6, 11019.0], [58.7, 11019.0], [58.8, 11020.0], [58.9, 11020.0], [59.0, 11020.0], [59.1, 11020.0], [59.2, 11022.0], [59.3, 11022.0], [59.4, 11022.0], [59.5, 11022.0], [59.6, 11032.0], [59.7, 11032.0], [59.8, 11032.0], [59.9, 11032.0], [60.0, 11034.0], [60.1, 11034.0], [60.2, 11034.0], [60.3, 11034.0], [60.4, 11034.0], [60.5, 11034.0], [60.6, 11034.0], [60.7, 11034.0], [60.8, 11035.0], [60.9, 11035.0], [61.0, 11035.0], [61.1, 11035.0], [61.2, 11035.0], [61.3, 11035.0], [61.4, 11035.0], [61.5, 11035.0], [61.6, 11040.0], [61.7, 11040.0], [61.8, 11040.0], [61.9, 11040.0], [62.0, 11044.0], [62.1, 11044.0], [62.2, 11044.0], [62.3, 11044.0], [62.4, 11046.0], [62.5, 11046.0], [62.6, 11046.0], [62.7, 11046.0], [62.8, 11048.0], [62.9, 11048.0], [63.0, 11048.0], [63.1, 11048.0], [63.2, 11048.0], [63.3, 11048.0], [63.4, 11048.0], [63.5, 11048.0], [63.6, 11052.0], [63.7, 11052.0], [63.8, 11052.0], [63.9, 11052.0], [64.0, 11073.0], [64.1, 11073.0], [64.2, 11073.0], [64.3, 11073.0], [64.4, 11077.0], [64.5, 11077.0], [64.6, 11077.0], [64.7, 11077.0], [64.8, 11097.0], [64.9, 11097.0], [65.0, 11097.0], [65.1, 11097.0], [65.2, 11099.0], [65.3, 11099.0], [65.4, 11099.0], [65.5, 11099.0], [65.6, 11100.0], [65.7, 11100.0], [65.8, 11100.0], [65.9, 11100.0], [66.0, 11100.0], [66.1, 11100.0], [66.2, 11100.0], [66.3, 11100.0], [66.4, 11106.0], [66.5, 11106.0], [66.6, 11106.0], [66.7, 11106.0], [66.8, 11106.0], [66.9, 11106.0], [67.0, 11106.0], [67.1, 11106.0], [67.2, 11107.0], [67.3, 11107.0], [67.4, 11107.0], [67.5, 11107.0], [67.6, 11109.0], [67.7, 11109.0], [67.8, 11109.0], [67.9, 11109.0], [68.0, 11110.0], [68.1, 11110.0], [68.2, 11110.0], [68.3, 11110.0], [68.4, 11116.0], [68.5, 11116.0], [68.6, 11116.0], [68.7, 11116.0], [68.8, 11116.0], [68.9, 11116.0], [69.0, 11116.0], [69.1, 11116.0], [69.2, 11117.0], [69.3, 11117.0], [69.4, 11117.0], [69.5, 11117.0], [69.6, 11122.0], [69.7, 11122.0], [69.8, 11122.0], [69.9, 11122.0], [70.0, 11126.0], [70.1, 11126.0], [70.2, 11126.0], [70.3, 11126.0], [70.4, 11132.0], [70.5, 11132.0], [70.6, 11132.0], [70.7, 11132.0], [70.8, 11132.0], [70.9, 11132.0], [71.0, 11132.0], [71.1, 11132.0], [71.2, 11133.0], [71.3, 11133.0], [71.4, 11133.0], [71.5, 11133.0], [71.6, 11154.0], [71.7, 11154.0], [71.8, 11154.0], [71.9, 11154.0], [72.0, 11165.0], [72.1, 11165.0], [72.2, 11165.0], [72.3, 11165.0], [72.4, 11179.0], [72.5, 11179.0], [72.6, 11179.0], [72.7, 11179.0], [72.8, 11182.0], [72.9, 11182.0], [73.0, 11182.0], [73.1, 11182.0], [73.2, 11192.0], [73.3, 11192.0], [73.4, 11192.0], [73.5, 11192.0], [73.6, 11199.0], [73.7, 11199.0], [73.8, 11199.0], [73.9, 11199.0], [74.0, 11208.0], [74.1, 11208.0], [74.2, 11208.0], [74.3, 11208.0], [74.4, 11247.0], [74.5, 11247.0], [74.6, 11247.0], [74.7, 11247.0], [74.8, 11258.0], [74.9, 11258.0], [75.0, 11258.0], [75.1, 11258.0], [75.2, 11265.0], [75.3, 11265.0], [75.4, 11265.0], [75.5, 11265.0], [75.6, 11289.0], [75.7, 11289.0], [75.8, 11289.0], [75.9, 11289.0], [76.0, 11296.0], [76.1, 11296.0], [76.2, 11296.0], [76.3, 11296.0], [76.4, 11297.0], [76.5, 11297.0], [76.6, 11297.0], [76.7, 11297.0], [76.8, 11299.0], [76.9, 11299.0], [77.0, 11299.0], [77.1, 11299.0], [77.2, 11308.0], [77.3, 11308.0], [77.4, 11308.0], [77.5, 11308.0], [77.6, 11309.0], [77.7, 11309.0], [77.8, 11309.0], [77.9, 11309.0], [78.0, 11328.0], [78.1, 11328.0], [78.2, 11328.0], [78.3, 11328.0], [78.4, 11328.0], [78.5, 11328.0], [78.6, 11328.0], [78.7, 11328.0], [78.8, 11328.0], [78.9, 11328.0], [79.0, 11328.0], [79.1, 11328.0], [79.2, 11343.0], [79.3, 11343.0], [79.4, 11343.0], [79.5, 11343.0], [79.6, 11348.0], [79.7, 11348.0], [79.8, 11348.0], [79.9, 11348.0], [80.0, 11348.0], [80.1, 11348.0], [80.2, 11348.0], [80.3, 11348.0], [80.4, 11349.0], [80.5, 11349.0], [80.6, 11349.0], [80.7, 11349.0], [80.8, 11370.0], [80.9, 11370.0], [81.0, 11370.0], [81.1, 11370.0], [81.2, 11385.0], [81.3, 11385.0], [81.4, 11385.0], [81.5, 11385.0], [81.6, 11385.0], [81.7, 11387.0], [81.8, 11387.0], [81.9, 11387.0], [82.0, 11387.0], [82.1, 11387.0], [82.2, 11387.0], [82.3, 11387.0], [82.4, 11406.0], [82.5, 11406.0], [82.6, 11406.0], [82.7, 11406.0], [82.8, 11406.0], [82.9, 11413.0], [83.0, 11413.0], [83.1, 11413.0], [83.2, 11413.0], [83.3, 11414.0], [83.4, 11414.0], [83.5, 11414.0], [83.6, 11414.0], [83.7, 11421.0], [83.8, 11421.0], [83.9, 11421.0], [84.0, 11421.0], [84.1, 11429.0], [84.2, 11429.0], [84.3, 11429.0], [84.4, 11429.0], [84.5, 11437.0], [84.6, 11437.0], [84.7, 11437.0], [84.8, 11437.0], [84.9, 11439.0], [85.0, 11439.0], [85.1, 11439.0], [85.2, 11439.0], [85.3, 11449.0], [85.4, 11449.0], [85.5, 11449.0], [85.6, 11449.0], [85.7, 11458.0], [85.8, 11458.0], [85.9, 11458.0], [86.0, 11458.0], [86.1, 11465.0], [86.2, 11465.0], [86.3, 11465.0], [86.4, 11465.0], [86.5, 11473.0], [86.6, 11473.0], [86.7, 11473.0], [86.8, 11473.0], [86.9, 11507.0], [87.0, 11507.0], [87.1, 11507.0], [87.2, 11507.0], [87.3, 11526.0], [87.4, 11526.0], [87.5, 11526.0], [87.6, 11526.0], [87.7, 11534.0], [87.8, 11534.0], [87.9, 11534.0], [88.0, 11534.0], [88.1, 11551.0], [88.2, 11551.0], [88.3, 11551.0], [88.4, 11551.0], [88.5, 11557.0], [88.6, 11557.0], [88.7, 11557.0], [88.8, 11557.0], [88.9, 11573.0], [89.0, 11573.0], [89.1, 11573.0], [89.2, 11573.0], [89.3, 11653.0], [89.4, 11653.0], [89.5, 11653.0], [89.6, 11653.0], [89.7, 11671.0], [89.8, 11671.0], [89.9, 11671.0], [90.0, 11671.0], [90.1, 11729.0], [90.2, 11729.0], [90.3, 11729.0], [90.4, 11729.0], [90.5, 11864.0], [90.6, 11864.0], [90.7, 11864.0], [90.8, 11864.0], [90.9, 11866.0], [91.0, 11866.0], [91.1, 11866.0], [91.2, 11866.0], [91.3, 11880.0], [91.4, 11880.0], [91.5, 11880.0], [91.6, 11880.0], [91.7, 11959.0], [91.8, 11959.0], [91.9, 11959.0], [92.0, 11959.0], [92.1, 11987.0], [92.2, 11987.0], [92.3, 11987.0], [92.4, 11987.0], [92.5, 12006.0], [92.6, 12006.0], [92.7, 12006.0], [92.8, 12006.0], [92.9, 12025.0], [93.0, 12025.0], [93.1, 12025.0], [93.2, 12025.0], [93.3, 12026.0], [93.4, 12026.0], [93.5, 12026.0], [93.6, 12026.0], [93.7, 12053.0], [93.8, 12053.0], [93.9, 12053.0], [94.0, 12053.0], [94.1, 12147.0], [94.2, 12147.0], [94.3, 12147.0], [94.4, 12147.0], [94.5, 12296.0], [94.6, 12296.0], [94.7, 12296.0], [94.8, 12296.0], [94.9, 12313.0], [95.0, 12313.0], [95.1, 12313.0], [95.2, 12313.0], [95.3, 12397.0], [95.4, 12397.0], [95.5, 12397.0], [95.6, 12397.0], [95.7, 12418.0], [95.8, 12418.0], [95.9, 12418.0], [96.0, 12418.0], [96.1, 12456.0], [96.2, 12456.0], [96.3, 12456.0], [96.4, 12456.0], [96.5, 12541.0], [96.6, 12541.0], [96.7, 12541.0], [96.8, 12541.0], [96.9, 12591.0], [97.0, 12591.0], [97.1, 12591.0], [97.2, 12591.0], [97.3, 12603.0], [97.4, 12603.0], [97.5, 12603.0], [97.6, 12603.0], [97.7, 12662.0], [97.8, 12662.0], [97.9, 12662.0], [98.0, 12662.0], [98.1, 12739.0], [98.2, 12739.0], [98.3, 12739.0], [98.4, 12739.0], [98.5, 12781.0], [98.6, 12781.0], [98.7, 12781.0], [98.8, 12781.0], [98.9, 12798.0], [99.0, 12798.0], [99.1, 12798.0], [99.2, 12798.0], [99.3, 12824.0], [99.4, 12824.0], [99.5, 12824.0], [99.6, 12824.0], [99.7, 12998.0], [99.8, 12998.0], [99.9, 12998.0], [100.0, 12998.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 2200.0, "maxY": 23.0, "series": [{"data": [[2200.0, 2.0], [2300.0, 1.0], [2600.0, 1.0], [3100.0, 1.0], [3300.0, 2.0], [3400.0, 1.0], [3800.0, 1.0], [3900.0, 1.0], [4600.0, 1.0], [4400.0, 1.0], [5100.0, 2.0], [5200.0, 2.0], [5300.0, 1.0], [5400.0, 1.0], [5600.0, 1.0], [6100.0, 1.0], [6000.0, 2.0], [5900.0, 2.0], [6400.0, 1.0], [6500.0, 2.0], [6800.0, 2.0], [7300.0, 3.0], [7600.0, 1.0], [7500.0, 1.0], [7800.0, 5.0], [8000.0, 1.0], [8100.0, 3.0], [8200.0, 1.0], [8600.0, 5.0], [8700.0, 1.0], [8500.0, 4.0], [8400.0, 3.0], [9000.0, 1.0], [9100.0, 8.0], [9200.0, 1.0], [9700.0, 2.0], [9300.0, 3.0], [9500.0, 2.0], [9800.0, 3.0], [9900.0, 5.0], [10000.0, 4.0], [10200.0, 5.0], [10300.0, 4.0], [10600.0, 13.0], [10400.0, 13.0], [10700.0, 4.0], [10500.0, 9.0], [11000.0, 23.0], [10800.0, 4.0], [10900.0, 3.0], [11100.0, 21.0], [11200.0, 8.0], [11400.0, 11.0], [11300.0, 13.0], [11500.0, 6.0], [11600.0, 2.0], [11700.0, 1.0], [11800.0, 3.0], [12100.0, 1.0], [12200.0, 1.0], [12000.0, 4.0], [11900.0, 2.0], [12400.0, 2.0], [12500.0, 2.0], [12600.0, 2.0], [12300.0, 2.0], [12700.0, 3.0], [12900.0, 1.0], [12800.0, 1.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 12900.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 250.0, "minX": 2.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1.500ms"], [2, "Requests having \nresponse time > 1.500ms"], [3, "Requests in error"]], "maxY": 250.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1.500ms", "isController": false}, {"data": [[2.0, 250.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1.500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 126.93600000000009, "minX": 1.71286908E12, "maxY": 126.93600000000009, "series": [{"data": [[1.71286908E12, 126.93600000000009]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286908E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 2213.0, "minX": 8.0, "maxY": 12603.0, "series": [{"data": [[8.0, 12595.25], [9.0, 11880.0], [10.0, 12603.0], [11.0, 12313.0], [12.0, 11987.0], [13.0, 11959.0], [14.0, 12397.0], [15.0, 12053.0], [16.0, 12026.0], [17.0, 12418.0], [19.0, 12479.0], [20.0, 12541.0], [25.0, 11968.0], [26.0, 11387.0], [27.0, 11449.0], [28.0, 11370.0], [29.0, 11729.0], [30.0, 11349.0], [31.0, 11343.0], [33.0, 11328.0], [32.0, 11653.0], [35.0, 11348.0], [34.0, 11328.0], [37.0, 11308.0], [36.0, 11328.0], [39.0, 11309.0], [38.0, 11296.0], [41.0, 11258.0], [40.0, 11289.0], [43.0, 11671.0], [42.0, 11265.0], [45.0, 11299.0], [44.0, 11247.0], [47.0, 11526.0], [46.0, 11551.0], [49.0, 11208.0], [48.0, 11199.0], [51.0, 11179.0], [50.0, 11182.0], [53.0, 11165.0], [52.0, 11192.0], [55.0, 11573.0], [54.0, 11534.0], [57.0, 11106.0], [56.0, 11126.0], [59.0, 11107.0], [58.0, 11116.0], [61.0, 11291.0], [63.0, 11121.0], [66.0, 11117.0], [65.0, 11557.0], [64.0, 11100.0], [69.0, 11116.0], [68.0, 11277.5], [95.0, 11126.0], [93.0, 10839.0], [92.0, 11216.26086956522], [99.0, 11001.0], [97.0, 11073.0], [96.0, 11154.0], [103.0, 11078.5], [101.0, 11132.0], [100.0, 11047.0], [107.0, 11048.0], [106.0, 11106.0], [105.0, 11041.5], [111.0, 10676.5], [109.0, 10659.0], [108.0, 11003.0], [115.0, 11032.0], [114.0, 10886.0], [113.0, 10644.0], [112.0, 10622.0], [119.0, 10855.0], [118.0, 10951.0], [117.0, 10924.0], [116.0, 11020.0], [123.0, 10444.0], [122.0, 10094.0], [121.0, 10703.0], [120.0, 10735.0], [127.0, 10577.0], [126.0, 10494.0], [125.0, 10654.0], [124.0, 10499.0], [135.0, 10639.0], [134.0, 10666.0], [133.0, 10480.0], [132.0, 10528.5], [130.0, 10543.0], [129.0, 10592.5], [142.0, 10619.0], [141.0, 10608.0], [140.0, 10765.5], [138.0, 10479.0], [136.0, 10455.0], [151.0, 11012.0], [150.0, 10624.5], [148.0, 10537.5], [146.0, 10473.5], [144.0, 10501.5], [159.0, 10765.0], [158.0, 10264.0], [157.0, 10393.0], [156.0, 10384.0], [155.0, 10505.0], [154.0, 10251.0], [153.0, 10327.5], [167.0, 9508.0], [166.0, 10168.0], [165.0, 10348.0], [163.0, 10670.0], [162.0, 10269.0], [161.0, 10453.0], [160.0, 9794.0], [174.0, 9332.0], [173.0, 9435.5], [171.0, 9974.0], [170.0, 9953.0], [169.0, 9352.0], [168.0, 10070.0], [183.0, 9155.0], [182.0, 9167.0], [181.0, 9148.0], [180.0, 9813.0], [179.0, 10033.0], [178.0, 9887.0], [177.0, 10046.0], [176.0, 10090.5], [191.0, 8536.333333333334], [188.0, 8608.0], [187.0, 9138.0], [186.0, 9878.0], [185.0, 9872.0], [193.0, 9279.0], [192.0, 9194.0], [207.0, 8665.0], [206.0, 8619.5], [204.0, 8143.0], [203.0, 8132.0], [202.0, 8745.333333333334], [215.0, 7572.0], [214.0, 8230.0], [213.0, 7831.0], [211.0, 7826.0], [210.0, 7821.0], [209.0, 8686.0], [208.0, 8752.0], [223.0, 6842.0], [222.0, 6830.0], [221.0, 7622.0], [220.0, 7944.0], [218.0, 7307.0], [217.0, 7333.0], [216.0, 7323.0], [231.0, 6271.5], [229.0, 6031.0], [228.0, 6058.0], [227.0, 6544.0], [226.0, 5913.0], [225.0, 6214.5], [239.0, 4461.0], [238.0, 5234.0], [237.0, 5251.0], [236.0, 5304.0], [235.0, 5152.0], [234.0, 5474.0], [233.0, 5162.0], [232.0, 5620.0], [247.0, 2291.0], [246.0, 3379.0], [245.0, 3318.0], [244.0, 3147.0], [243.0, 3490.0], [242.0, 3877.0], [241.0, 3967.0], [240.0, 4650.0], [250.0, 2213.0], [249.0, 2330.0], [248.0, 2636.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[126.93600000000009, 9917.979999999998]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 250.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 5008.333333333333, "minX": 1.71286908E12, "maxY": 5558.333333333333, "series": [{"data": [[1.71286908E12, 5008.333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71286908E12, 5558.333333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286908E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 9917.979999999998, "minX": 1.71286908E12, "maxY": 9917.979999999998, "series": [{"data": [[1.71286908E12, 9917.979999999998]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286908E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 9917.979999999998, "minX": 1.71286908E12, "maxY": 9917.979999999998, "series": [{"data": [[1.71286908E12, 9917.979999999998]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286908E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 528.8720000000001, "minX": 1.71286908E12, "maxY": 528.8720000000001, "series": [{"data": [[1.71286908E12, 528.8720000000001]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286908E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 2213.0, "minX": 1.71286908E12, "maxY": 12998.0, "series": [{"data": [[1.71286908E12, 12998.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71286908E12, 11723.2]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71286908E12, 12810.74]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71286908E12, 12350.8]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.71286908E12, 2213.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71286908E12, 10649.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286908E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 2483.0, "minX": 2.0, "maxY": 12015.5, "series": [{"data": [[2.0, 2483.0], [9.0, 6136.0], [36.0, 12015.5], [82.0, 11116.5], [6.0, 3434.5], [25.0, 9140.0], [13.0, 8143.0], [7.0, 6225.0], [59.0, 10480.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 82.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 2483.0, "minX": 2.0, "maxY": 12015.5, "series": [{"data": [[2.0, 2483.0], [9.0, 6136.0], [36.0, 12015.5], [82.0, 11116.5], [6.0, 3434.5], [25.0, 9140.0], [13.0, 8143.0], [7.0, 6225.0], [59.0, 10480.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 82.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 4.166666666666667, "minX": 1.71286908E12, "maxY": 4.166666666666667, "series": [{"data": [[1.71286908E12, 4.166666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286908E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 4.166666666666667, "minX": 1.71286908E12, "maxY": 4.166666666666667, "series": [{"data": [[1.71286908E12, 4.166666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71286908E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 4.166666666666667, "minX": 1.71286908E12, "maxY": 4.166666666666667, "series": [{"data": [[1.71286908E12, 4.166666666666667]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286908E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 4.166666666666667, "minX": 1.71286908E12, "maxY": 4.166666666666667, "series": [{"data": [[1.71286908E12, 4.166666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71286908E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

