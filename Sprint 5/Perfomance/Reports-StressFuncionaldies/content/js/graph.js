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
        data: {"result": {"minY": 6.0, "minX": 0.0, "maxY": 2398.0, "series": [{"data": [[0.0, 6.0], [0.1, 27.0], [0.2, 41.0], [0.3, 49.0], [0.4, 54.0], [0.5, 58.0], [0.6, 61.0], [0.7, 64.0], [0.8, 66.0], [0.9, 68.0], [1.0, 70.0], [1.1, 72.0], [1.2, 74.0], [1.3, 76.0], [1.4, 78.0], [1.5, 79.0], [1.6, 81.0], [1.7, 82.0], [1.8, 84.0], [1.9, 85.0], [2.0, 86.0], [2.1, 88.0], [2.2, 89.0], [2.3, 90.0], [2.4, 91.0], [2.5, 92.0], [2.6, 94.0], [2.7, 95.0], [2.8, 96.0], [2.9, 97.0], [3.0, 98.0], [3.1, 99.0], [3.2, 100.0], [3.3, 101.0], [3.4, 102.0], [3.5, 103.0], [3.6, 104.0], [3.7, 105.0], [3.8, 106.0], [3.9, 107.0], [4.0, 108.0], [4.1, 109.0], [4.2, 109.0], [4.3, 110.0], [4.4, 111.0], [4.5, 112.0], [4.6, 113.0], [4.7, 113.0], [4.8, 114.0], [4.9, 115.0], [5.0, 116.0], [5.1, 116.0], [5.2, 117.0], [5.3, 118.0], [5.4, 119.0], [5.5, 119.0], [5.6, 120.0], [5.7, 121.0], [5.8, 122.0], [5.9, 122.0], [6.0, 123.0], [6.1, 124.0], [6.2, 124.0], [6.3, 125.0], [6.4, 126.0], [6.5, 126.0], [6.6, 127.0], [6.7, 128.0], [6.8, 128.0], [6.9, 129.0], [7.0, 130.0], [7.1, 130.0], [7.2, 131.0], [7.3, 132.0], [7.4, 132.0], [7.5, 133.0], [7.6, 133.0], [7.7, 134.0], [7.8, 135.0], [7.9, 135.0], [8.0, 136.0], [8.1, 136.0], [8.2, 137.0], [8.3, 137.0], [8.4, 138.0], [8.5, 139.0], [8.6, 139.0], [8.7, 140.0], [8.8, 140.0], [8.9, 141.0], [9.0, 141.0], [9.1, 142.0], [9.2, 142.0], [9.3, 143.0], [9.4, 144.0], [9.5, 144.0], [9.6, 145.0], [9.7, 145.0], [9.8, 146.0], [9.9, 146.0], [10.0, 147.0], [10.1, 148.0], [10.2, 148.0], [10.3, 149.0], [10.4, 149.0], [10.5, 150.0], [10.6, 150.0], [10.7, 151.0], [10.8, 151.0], [10.9, 151.0], [11.0, 152.0], [11.1, 152.0], [11.2, 153.0], [11.3, 153.0], [11.4, 154.0], [11.5, 154.0], [11.6, 155.0], [11.7, 155.0], [11.8, 156.0], [11.9, 156.0], [12.0, 157.0], [12.1, 157.0], [12.2, 158.0], [12.3, 158.0], [12.4, 159.0], [12.5, 159.0], [12.6, 160.0], [12.7, 160.0], [12.8, 161.0], [12.9, 161.0], [13.0, 162.0], [13.1, 162.0], [13.2, 163.0], [13.3, 163.0], [13.4, 164.0], [13.5, 164.0], [13.6, 165.0], [13.7, 165.0], [13.8, 165.0], [13.9, 166.0], [14.0, 166.0], [14.1, 167.0], [14.2, 167.0], [14.3, 168.0], [14.4, 168.0], [14.5, 168.0], [14.6, 169.0], [14.7, 169.0], [14.8, 170.0], [14.9, 170.0], [15.0, 170.0], [15.1, 171.0], [15.2, 171.0], [15.3, 172.0], [15.4, 172.0], [15.5, 173.0], [15.6, 173.0], [15.7, 174.0], [15.8, 174.0], [15.9, 175.0], [16.0, 175.0], [16.1, 175.0], [16.2, 176.0], [16.3, 176.0], [16.4, 177.0], [16.5, 177.0], [16.6, 178.0], [16.7, 178.0], [16.8, 179.0], [16.9, 179.0], [17.0, 180.0], [17.1, 180.0], [17.2, 181.0], [17.3, 181.0], [17.4, 182.0], [17.5, 182.0], [17.6, 182.0], [17.7, 183.0], [17.8, 183.0], [17.9, 184.0], [18.0, 184.0], [18.1, 185.0], [18.2, 185.0], [18.3, 185.0], [18.4, 186.0], [18.5, 186.0], [18.6, 187.0], [18.7, 187.0], [18.8, 187.0], [18.9, 188.0], [19.0, 188.0], [19.1, 188.0], [19.2, 189.0], [19.3, 189.0], [19.4, 189.0], [19.5, 190.0], [19.6, 190.0], [19.7, 191.0], [19.8, 191.0], [19.9, 191.0], [20.0, 192.0], [20.1, 192.0], [20.2, 192.0], [20.3, 193.0], [20.4, 193.0], [20.5, 193.0], [20.6, 194.0], [20.7, 194.0], [20.8, 194.0], [20.9, 195.0], [21.0, 195.0], [21.1, 196.0], [21.2, 196.0], [21.3, 196.0], [21.4, 197.0], [21.5, 197.0], [21.6, 197.0], [21.7, 197.0], [21.8, 198.0], [21.9, 198.0], [22.0, 198.0], [22.1, 198.0], [22.2, 199.0], [22.3, 199.0], [22.4, 199.0], [22.5, 199.0], [22.6, 199.0], [22.7, 200.0], [22.8, 200.0], [22.9, 200.0], [23.0, 201.0], [23.1, 201.0], [23.2, 201.0], [23.3, 202.0], [23.4, 202.0], [23.5, 202.0], [23.6, 202.0], [23.7, 202.0], [23.8, 203.0], [23.9, 203.0], [24.0, 203.0], [24.1, 203.0], [24.2, 203.0], [24.3, 204.0], [24.4, 204.0], [24.5, 204.0], [24.6, 204.0], [24.7, 205.0], [24.8, 205.0], [24.9, 205.0], [25.0, 205.0], [25.1, 206.0], [25.2, 206.0], [25.3, 206.0], [25.4, 206.0], [25.5, 207.0], [25.6, 207.0], [25.7, 207.0], [25.8, 207.0], [25.9, 208.0], [26.0, 208.0], [26.1, 208.0], [26.2, 208.0], [26.3, 208.0], [26.4, 209.0], [26.5, 209.0], [26.6, 209.0], [26.7, 209.0], [26.8, 209.0], [26.9, 210.0], [27.0, 210.0], [27.1, 210.0], [27.2, 211.0], [27.3, 211.0], [27.4, 211.0], [27.5, 211.0], [27.6, 211.0], [27.7, 212.0], [27.8, 212.0], [27.9, 212.0], [28.0, 212.0], [28.1, 212.0], [28.2, 213.0], [28.3, 213.0], [28.4, 213.0], [28.5, 213.0], [28.6, 213.0], [28.7, 214.0], [28.8, 214.0], [28.9, 214.0], [29.0, 214.0], [29.1, 214.0], [29.2, 215.0], [29.3, 215.0], [29.4, 215.0], [29.5, 215.0], [29.6, 215.0], [29.7, 216.0], [29.8, 216.0], [29.9, 216.0], [30.0, 216.0], [30.1, 216.0], [30.2, 217.0], [30.3, 217.0], [30.4, 217.0], [30.5, 217.0], [30.6, 217.0], [30.7, 217.0], [30.8, 218.0], [30.9, 218.0], [31.0, 218.0], [31.1, 218.0], [31.2, 218.0], [31.3, 218.0], [31.4, 219.0], [31.5, 219.0], [31.6, 219.0], [31.7, 219.0], [31.8, 219.0], [31.9, 219.0], [32.0, 220.0], [32.1, 220.0], [32.2, 220.0], [32.3, 220.0], [32.4, 220.0], [32.5, 220.0], [32.6, 220.0], [32.7, 221.0], [32.8, 221.0], [32.9, 221.0], [33.0, 221.0], [33.1, 221.0], [33.2, 221.0], [33.3, 222.0], [33.4, 222.0], [33.5, 222.0], [33.6, 222.0], [33.7, 222.0], [33.8, 222.0], [33.9, 223.0], [34.0, 223.0], [34.1, 223.0], [34.2, 223.0], [34.3, 223.0], [34.4, 224.0], [34.5, 224.0], [34.6, 224.0], [34.7, 224.0], [34.8, 224.0], [34.9, 224.0], [35.0, 225.0], [35.1, 225.0], [35.2, 225.0], [35.3, 225.0], [35.4, 225.0], [35.5, 225.0], [35.6, 226.0], [35.7, 226.0], [35.8, 226.0], [35.9, 226.0], [36.0, 227.0], [36.1, 227.0], [36.2, 227.0], [36.3, 227.0], [36.4, 227.0], [36.5, 228.0], [36.6, 228.0], [36.7, 228.0], [36.8, 228.0], [36.9, 229.0], [37.0, 229.0], [37.1, 229.0], [37.2, 229.0], [37.3, 229.0], [37.4, 230.0], [37.5, 230.0], [37.6, 230.0], [37.7, 230.0], [37.8, 230.0], [37.9, 230.0], [38.0, 231.0], [38.1, 231.0], [38.2, 231.0], [38.3, 231.0], [38.4, 231.0], [38.5, 231.0], [38.6, 232.0], [38.7, 232.0], [38.8, 232.0], [38.9, 232.0], [39.0, 232.0], [39.1, 232.0], [39.2, 233.0], [39.3, 233.0], [39.4, 233.0], [39.5, 233.0], [39.6, 233.0], [39.7, 234.0], [39.8, 234.0], [39.9, 234.0], [40.0, 234.0], [40.1, 234.0], [40.2, 234.0], [40.3, 234.0], [40.4, 235.0], [40.5, 235.0], [40.6, 235.0], [40.7, 235.0], [40.8, 235.0], [40.9, 235.0], [41.0, 235.0], [41.1, 236.0], [41.2, 236.0], [41.3, 236.0], [41.4, 236.0], [41.5, 236.0], [41.6, 236.0], [41.7, 237.0], [41.8, 237.0], [41.9, 237.0], [42.0, 237.0], [42.1, 237.0], [42.2, 238.0], [42.3, 238.0], [42.4, 238.0], [42.5, 238.0], [42.6, 238.0], [42.7, 239.0], [42.8, 239.0], [42.9, 239.0], [43.0, 239.0], [43.1, 239.0], [43.2, 240.0], [43.3, 240.0], [43.4, 240.0], [43.5, 240.0], [43.6, 240.0], [43.7, 241.0], [43.8, 241.0], [43.9, 241.0], [44.0, 241.0], [44.1, 241.0], [44.2, 242.0], [44.3, 242.0], [44.4, 242.0], [44.5, 243.0], [44.6, 243.0], [44.7, 243.0], [44.8, 243.0], [44.9, 244.0], [45.0, 244.0], [45.1, 244.0], [45.2, 245.0], [45.3, 245.0], [45.4, 245.0], [45.5, 245.0], [45.6, 246.0], [45.7, 246.0], [45.8, 246.0], [45.9, 246.0], [46.0, 247.0], [46.1, 247.0], [46.2, 247.0], [46.3, 248.0], [46.4, 248.0], [46.5, 248.0], [46.6, 248.0], [46.7, 249.0], [46.8, 249.0], [46.9, 249.0], [47.0, 250.0], [47.1, 250.0], [47.2, 250.0], [47.3, 250.0], [47.4, 251.0], [47.5, 251.0], [47.6, 251.0], [47.7, 251.0], [47.8, 252.0], [47.9, 252.0], [48.0, 252.0], [48.1, 252.0], [48.2, 253.0], [48.3, 253.0], [48.4, 253.0], [48.5, 253.0], [48.6, 254.0], [48.7, 254.0], [48.8, 254.0], [48.9, 254.0], [49.0, 255.0], [49.1, 255.0], [49.2, 255.0], [49.3, 255.0], [49.4, 256.0], [49.5, 256.0], [49.6, 256.0], [49.7, 256.0], [49.8, 256.0], [49.9, 257.0], [50.0, 257.0], [50.1, 257.0], [50.2, 257.0], [50.3, 258.0], [50.4, 258.0], [50.5, 258.0], [50.6, 258.0], [50.7, 259.0], [50.8, 259.0], [50.9, 259.0], [51.0, 259.0], [51.1, 260.0], [51.2, 260.0], [51.3, 260.0], [51.4, 260.0], [51.5, 261.0], [51.6, 261.0], [51.7, 261.0], [51.8, 261.0], [51.9, 262.0], [52.0, 262.0], [52.1, 262.0], [52.2, 262.0], [52.3, 263.0], [52.4, 263.0], [52.5, 263.0], [52.6, 264.0], [52.7, 264.0], [52.8, 264.0], [52.9, 264.0], [53.0, 265.0], [53.1, 265.0], [53.2, 265.0], [53.3, 265.0], [53.4, 266.0], [53.5, 266.0], [53.6, 266.0], [53.7, 267.0], [53.8, 267.0], [53.9, 267.0], [54.0, 267.0], [54.1, 268.0], [54.2, 268.0], [54.3, 268.0], [54.4, 268.0], [54.5, 269.0], [54.6, 269.0], [54.7, 269.0], [54.8, 269.0], [54.9, 270.0], [55.0, 270.0], [55.1, 270.0], [55.2, 271.0], [55.3, 271.0], [55.4, 271.0], [55.5, 272.0], [55.6, 272.0], [55.7, 272.0], [55.8, 272.0], [55.9, 273.0], [56.0, 273.0], [56.1, 273.0], [56.2, 274.0], [56.3, 274.0], [56.4, 274.0], [56.5, 274.0], [56.6, 275.0], [56.7, 275.0], [56.8, 275.0], [56.9, 275.0], [57.0, 276.0], [57.1, 276.0], [57.2, 276.0], [57.3, 277.0], [57.4, 277.0], [57.5, 277.0], [57.6, 277.0], [57.7, 278.0], [57.8, 278.0], [57.9, 278.0], [58.0, 278.0], [58.1, 279.0], [58.2, 279.0], [58.3, 279.0], [58.4, 279.0], [58.5, 280.0], [58.6, 280.0], [58.7, 280.0], [58.8, 280.0], [58.9, 281.0], [59.0, 281.0], [59.1, 281.0], [59.2, 281.0], [59.3, 282.0], [59.4, 282.0], [59.5, 282.0], [59.6, 283.0], [59.7, 283.0], [59.8, 283.0], [59.9, 283.0], [60.0, 283.0], [60.1, 283.0], [60.2, 284.0], [60.3, 284.0], [60.4, 284.0], [60.5, 284.0], [60.6, 285.0], [60.7, 285.0], [60.8, 285.0], [60.9, 285.0], [61.0, 286.0], [61.1, 286.0], [61.2, 286.0], [61.3, 286.0], [61.4, 287.0], [61.5, 287.0], [61.6, 287.0], [61.7, 288.0], [61.8, 288.0], [61.9, 288.0], [62.0, 288.0], [62.1, 289.0], [62.2, 289.0], [62.3, 289.0], [62.4, 290.0], [62.5, 290.0], [62.6, 290.0], [62.7, 291.0], [62.8, 291.0], [62.9, 291.0], [63.0, 292.0], [63.1, 292.0], [63.2, 292.0], [63.3, 292.0], [63.4, 292.0], [63.5, 293.0], [63.6, 293.0], [63.7, 293.0], [63.8, 293.0], [63.9, 294.0], [64.0, 294.0], [64.1, 294.0], [64.2, 294.0], [64.3, 295.0], [64.4, 295.0], [64.5, 295.0], [64.6, 295.0], [64.7, 295.0], [64.8, 296.0], [64.9, 296.0], [65.0, 296.0], [65.1, 296.0], [65.2, 296.0], [65.3, 297.0], [65.4, 297.0], [65.5, 297.0], [65.6, 297.0], [65.7, 297.0], [65.8, 298.0], [65.9, 298.0], [66.0, 298.0], [66.1, 298.0], [66.2, 299.0], [66.3, 299.0], [66.4, 299.0], [66.5, 299.0], [66.6, 299.0], [66.7, 300.0], [66.8, 300.0], [66.9, 300.0], [67.0, 300.0], [67.1, 301.0], [67.2, 301.0], [67.3, 301.0], [67.4, 302.0], [67.5, 302.0], [67.6, 302.0], [67.7, 302.0], [67.8, 303.0], [67.9, 303.0], [68.0, 303.0], [68.1, 303.0], [68.2, 304.0], [68.3, 304.0], [68.4, 304.0], [68.5, 304.0], [68.6, 305.0], [68.7, 305.0], [68.8, 305.0], [68.9, 305.0], [69.0, 306.0], [69.1, 306.0], [69.2, 306.0], [69.3, 307.0], [69.4, 307.0], [69.5, 307.0], [69.6, 307.0], [69.7, 308.0], [69.8, 308.0], [69.9, 308.0], [70.0, 309.0], [70.1, 309.0], [70.2, 309.0], [70.3, 310.0], [70.4, 310.0], [70.5, 310.0], [70.6, 311.0], [70.7, 311.0], [70.8, 311.0], [70.9, 312.0], [71.0, 312.0], [71.1, 312.0], [71.2, 313.0], [71.3, 313.0], [71.4, 313.0], [71.5, 314.0], [71.6, 314.0], [71.7, 314.0], [71.8, 315.0], [71.9, 315.0], [72.0, 315.0], [72.1, 316.0], [72.2, 316.0], [72.3, 316.0], [72.4, 316.0], [72.5, 316.0], [72.6, 317.0], [72.7, 317.0], [72.8, 317.0], [72.9, 318.0], [73.0, 318.0], [73.1, 318.0], [73.2, 318.0], [73.3, 318.0], [73.4, 319.0], [73.5, 319.0], [73.6, 319.0], [73.7, 319.0], [73.8, 319.0], [73.9, 320.0], [74.0, 320.0], [74.1, 320.0], [74.2, 320.0], [74.3, 321.0], [74.4, 321.0], [74.5, 321.0], [74.6, 321.0], [74.7, 321.0], [74.8, 322.0], [74.9, 322.0], [75.0, 322.0], [75.1, 322.0], [75.2, 322.0], [75.3, 323.0], [75.4, 323.0], [75.5, 323.0], [75.6, 323.0], [75.7, 323.0], [75.8, 324.0], [75.9, 324.0], [76.0, 324.0], [76.1, 324.0], [76.2, 324.0], [76.3, 325.0], [76.4, 325.0], [76.5, 325.0], [76.6, 325.0], [76.7, 325.0], [76.8, 326.0], [76.9, 326.0], [77.0, 326.0], [77.1, 326.0], [77.2, 327.0], [77.3, 327.0], [77.4, 327.0], [77.5, 327.0], [77.6, 328.0], [77.7, 328.0], [77.8, 328.0], [77.9, 328.0], [78.0, 329.0], [78.1, 329.0], [78.2, 329.0], [78.3, 329.0], [78.4, 330.0], [78.5, 330.0], [78.6, 330.0], [78.7, 330.0], [78.8, 331.0], [78.9, 331.0], [79.0, 331.0], [79.1, 331.0], [79.2, 331.0], [79.3, 332.0], [79.4, 332.0], [79.5, 332.0], [79.6, 332.0], [79.7, 332.0], [79.8, 333.0], [79.9, 333.0], [80.0, 333.0], [80.1, 333.0], [80.2, 334.0], [80.3, 334.0], [80.4, 334.0], [80.5, 334.0], [80.6, 335.0], [80.7, 335.0], [80.8, 335.0], [80.9, 335.0], [81.0, 335.0], [81.1, 336.0], [81.2, 336.0], [81.3, 336.0], [81.4, 336.0], [81.5, 336.0], [81.6, 337.0], [81.7, 337.0], [81.8, 337.0], [81.9, 337.0], [82.0, 338.0], [82.1, 338.0], [82.2, 338.0], [82.3, 338.0], [82.4, 339.0], [82.5, 339.0], [82.6, 339.0], [82.7, 339.0], [82.8, 340.0], [82.9, 340.0], [83.0, 340.0], [83.1, 340.0], [83.2, 341.0], [83.3, 341.0], [83.4, 341.0], [83.5, 342.0], [83.6, 342.0], [83.7, 342.0], [83.8, 342.0], [83.9, 343.0], [84.0, 343.0], [84.1, 343.0], [84.2, 343.0], [84.3, 344.0], [84.4, 344.0], [84.5, 344.0], [84.6, 344.0], [84.7, 345.0], [84.8, 345.0], [84.9, 345.0], [85.0, 345.0], [85.1, 345.0], [85.2, 346.0], [85.3, 346.0], [85.4, 346.0], [85.5, 347.0], [85.6, 347.0], [85.7, 347.0], [85.8, 347.0], [85.9, 347.0], [86.0, 348.0], [86.1, 348.0], [86.2, 348.0], [86.3, 348.0], [86.4, 349.0], [86.5, 349.0], [86.6, 349.0], [86.7, 349.0], [86.8, 350.0], [86.9, 350.0], [87.0, 350.0], [87.1, 351.0], [87.2, 351.0], [87.3, 351.0], [87.4, 352.0], [87.5, 352.0], [87.6, 352.0], [87.7, 353.0], [87.8, 353.0], [87.9, 353.0], [88.0, 354.0], [88.1, 354.0], [88.2, 354.0], [88.3, 355.0], [88.4, 355.0], [88.5, 356.0], [88.6, 356.0], [88.7, 356.0], [88.8, 357.0], [88.9, 357.0], [89.0, 358.0], [89.1, 358.0], [89.2, 359.0], [89.3, 359.0], [89.4, 360.0], [89.5, 360.0], [89.6, 361.0], [89.7, 361.0], [89.8, 362.0], [89.9, 362.0], [90.0, 363.0], [90.1, 363.0], [90.2, 364.0], [90.3, 364.0], [90.4, 364.0], [90.5, 365.0], [90.6, 365.0], [90.7, 365.0], [90.8, 366.0], [90.9, 366.0], [91.0, 367.0], [91.1, 367.0], [91.2, 368.0], [91.3, 368.0], [91.4, 369.0], [91.5, 370.0], [91.6, 370.0], [91.7, 371.0], [91.8, 372.0], [91.9, 373.0], [92.0, 373.0], [92.1, 374.0], [92.2, 375.0], [92.3, 376.0], [92.4, 377.0], [92.5, 378.0], [92.6, 378.0], [92.7, 379.0], [92.8, 380.0], [92.9, 381.0], [93.0, 382.0], [93.1, 383.0], [93.2, 384.0], [93.3, 385.0], [93.4, 386.0], [93.5, 387.0], [93.6, 388.0], [93.7, 389.0], [93.8, 391.0], [93.9, 392.0], [94.0, 394.0], [94.1, 395.0], [94.2, 396.0], [94.3, 398.0], [94.4, 399.0], [94.5, 400.0], [94.6, 402.0], [94.7, 403.0], [94.8, 406.0], [94.9, 408.0], [95.0, 411.0], [95.1, 413.0], [95.2, 416.0], [95.3, 418.0], [95.4, 421.0], [95.5, 424.0], [95.6, 427.0], [95.7, 429.0], [95.8, 433.0], [95.9, 436.0], [96.0, 438.0], [96.1, 441.0], [96.2, 443.0], [96.3, 445.0], [96.4, 448.0], [96.5, 450.0], [96.6, 452.0], [96.7, 456.0], [96.8, 460.0], [96.9, 465.0], [97.0, 469.0], [97.1, 474.0], [97.2, 480.0], [97.3, 487.0], [97.4, 495.0], [97.5, 500.0], [97.6, 504.0], [97.7, 510.0], [97.8, 516.0], [97.9, 522.0], [98.0, 532.0], [98.1, 542.0], [98.2, 556.0], [98.3, 572.0], [98.4, 584.0], [98.5, 601.0], [98.6, 622.0], [98.7, 643.0], [98.8, 659.0], [98.9, 678.0], [99.0, 723.0], [99.1, 756.0], [99.2, 782.0], [99.3, 823.0], [99.4, 932.0], [99.5, 989.0], [99.6, 1031.0], [99.7, 1102.0], [99.8, 1202.0], [99.9, 1776.0], [100.0, 2398.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 32173.0, "series": [{"data": [[0.0, 2312.0], [2100.0, 27.0], [2200.0, 4.0], [2300.0, 7.0], [600.0, 336.0], [700.0, 213.0], [200.0, 32173.0], [800.0, 86.0], [900.0, 111.0], [1000.0, 129.0], [1100.0, 74.0], [300.0, 20340.0], [1200.0, 8.0], [1300.0, 7.0], [1400.0, 3.0], [1500.0, 24.0], [400.0, 2234.0], [100.0, 14214.0], [1600.0, 3.0], [1700.0, 35.0], [1800.0, 29.0], [1900.0, 1.0], [500.0, 740.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 129.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1.500ms"], [2, "Requests having \nresponse time > 1.500ms"], [3, "Requests in error"]], "maxY": 71288.0, "series": [{"data": [[0.0, 71288.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 1693.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1.500ms", "isController": false}, {"data": [[2.0, 129.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1.500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 199.28603207635194, "minX": 1.71277416E12, "maxY": 200.0, "series": [{"data": [[1.71277422E12, 200.0], [1.71277416E12, 199.97459131247038], [1.71277428E12, 199.28603207635194]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71277428E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 95.0, "minX": 1.0, "maxY": 352.0, "series": [{"data": [[2.0, 351.0], [3.0, 352.0], [4.0, 352.0], [5.0, 350.0], [6.0, 351.0], [7.0, 350.0], [8.0, 350.0], [9.0, 349.0], [10.0, 349.0], [11.0, 348.0], [12.0, 348.0], [13.0, 348.0], [14.0, 348.0], [15.0, 350.0], [16.0, 349.0], [17.0, 349.0], [18.0, 347.0], [19.0, 347.0], [20.0, 347.0], [21.0, 349.0], [22.0, 348.0], [23.0, 347.0], [24.0, 346.0], [25.0, 345.0], [26.0, 344.0], [27.0, 343.0], [28.0, 338.0], [29.0, 336.0], [30.0, 334.0], [31.0, 322.0], [33.0, 318.0], [32.0, 319.0], [35.0, 316.0], [34.0, 317.0], [37.0, 315.0], [36.0, 315.0], [39.0, 312.0], [38.0, 313.0], [41.0, 308.0], [40.0, 311.0], [43.0, 305.0], [42.0, 306.0], [45.0, 301.0], [44.0, 303.0], [47.0, 299.0], [46.0, 300.0], [49.0, 297.0], [48.0, 298.0], [51.0, 295.0], [50.0, 296.0], [53.0, 289.0], [52.0, 292.0], [55.0, 285.0], [54.0, 286.0], [57.0, 283.0], [56.0, 284.0], [59.0, 280.0], [58.0, 282.0], [61.0, 279.0], [60.0, 280.0], [63.0, 272.0], [62.0, 276.0], [67.0, 267.0], [66.0, 268.0], [65.0, 269.0], [64.0, 270.0], [71.0, 260.0], [70.0, 263.0], [69.0, 265.0], [68.0, 266.0], [75.0, 252.0], [74.0, 253.0], [73.0, 254.0], [72.0, 258.0], [79.0, 248.0], [78.0, 249.0], [77.0, 250.0], [76.0, 251.0], [83.0, 237.0], [82.0, 237.0], [81.0, 239.0], [80.0, 246.0], [87.0, 233.0], [86.0, 234.0], [85.0, 235.0], [84.0, 236.0], [91.0, 226.0], [90.0, 229.0], [89.0, 230.0], [88.0, 232.0], [95.0, 219.0], [94.0, 221.0], [93.0, 222.0], [92.0, 224.0], [99.0, 212.0], [98.0, 213.0], [97.0, 215.0], [96.0, 216.0], [103.0, 204.0], [102.0, 205.0], [101.0, 207.0], [100.0, 209.0], [107.0, 198.0], [106.0, 199.0], [105.0, 202.0], [104.0, 203.0], [111.0, 190.0], [110.0, 191.0], [109.0, 194.0], [108.0, 196.0], [115.0, 185.0], [114.0, 186.0], [113.0, 187.0], [112.0, 188.0], [119.0, 180.0], [118.0, 182.0], [117.0, 183.0], [116.0, 184.0], [123.0, 172.0], [122.0, 173.0], [121.0, 174.0], [120.0, 176.0], [125.0, 259.0], [127.0, 289.5], [126.0, 168.0], [124.0, 171.0], [135.0, 153.0], [134.0, 155.0], [133.0, 156.0], [132.0, 157.0], [131.0, 159.0], [130.0, 162.0], [129.0, 165.0], [128.0, 166.0], [143.0, 144.0], [142.0, 145.0], [141.0, 146.0], [140.0, 148.0], [139.0, 149.0], [138.0, 150.0], [137.0, 151.0], [136.0, 152.0], [151.0, 288.0], [150.0, 130.0], [149.0, 133.0], [148.0, 134.0], [147.0, 135.0], [146.0, 136.0], [145.0, 138.0], [144.0, 142.0], [158.0, 120.0], [157.0, 120.0], [156.0, 121.0], [155.0, 122.0], [154.0, 124.0], [153.0, 124.0], [152.0, 126.0], [167.0, 219.0], [166.0, 219.0], [165.0, 220.0], [164.0, 222.0], [163.0, 222.0], [162.0, 224.0], [161.0, 224.0], [160.0, 95.0], [175.0, 212.0], [174.0, 213.0], [173.0, 216.0], [172.0, 216.0], [171.0, 216.0], [170.0, 218.0], [169.0, 218.0], [168.0, 219.0], [183.0, 205.0], [182.0, 207.0], [181.0, 207.0], [180.0, 208.0], [179.0, 208.0], [178.0, 209.0], [177.0, 209.0], [176.0, 210.0], [191.0, 195.0], [190.0, 196.0], [189.0, 197.0], [188.0, 198.0], [187.0, 198.0], [186.0, 198.0], [185.0, 199.0], [184.0, 200.0], [199.0, 176.0], [198.0, 190.0], [197.0, 190.0], [196.0, 191.0], [195.0, 192.0], [194.0, 194.0], [193.0, 195.0], [192.0, 195.0], [200.0, 268.77771681731554], [1.0, 351.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[199.72410067022358, 268.6921488168519]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 200.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 21231.583333333332, "minX": 1.71277416E12, "maxY": 829967.1333333333, "series": [{"data": [[1.71277422E12, 829967.1333333333], [1.71277416E12, 257276.83333333334], [1.71277428E12, 669833.0333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.71277422E12, 68492.43333333333], [1.71277416E12, 21231.583333333332], [1.71277428E12, 55277.48333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71277428E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 215.58598543288753, "minX": 1.71277416E12, "maxY": 324.6731433909405, "series": [{"data": [[1.71277422E12, 294.19876064168704], [1.71277416E12, 324.6731433909405], [1.71277428E12, 215.58598543288753]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71277428E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 215.57565211151356, "minX": 1.71277416E12, "maxY": 324.65688930406264, "series": [{"data": [[1.71277422E12, 294.18842300341794], [1.71277416E12, 324.65688930406264], [1.71277428E12, 215.57565211151356]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71277428E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.71277416E12, "maxY": 19.04072863148065, "series": [{"data": [[1.71277422E12, 4.6815312445705874], [1.71277416E12, 19.04072863148065], [1.71277428E12, 0.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71277428E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 6.0, "minX": 1.71277416E12, "maxY": 2398.0, "series": [{"data": [[1.71277422E12, 1778.0], [1.71277416E12, 2398.0], [1.71277428E12, 852.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.71277422E12, 443.0], [1.71277416E12, 375.0], [1.71277428E12, 266.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.71277422E12, 1009.0], [1.71277416E12, 1206.880000000001], [1.71277428E12, 372.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.71277422E12, 534.0], [1.71277416E12, 392.0], [1.71277428E12, 300.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.71277422E12, 6.0], [1.71277416E12, 11.0], [1.71277428E12, 6.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.71277422E12, 294.0], [1.71277416E12, 329.0], [1.71277428E12, 214.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71277428E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 172.0, "minX": 138.0, "maxY": 957.0, "series": [{"data": [[138.0, 305.5], [257.0, 365.0], [272.0, 957.0], [292.0, 314.5], [297.0, 479.0], [310.0, 522.0], [334.0, 383.5], [337.0, 598.0], [416.0, 369.5], [426.0, 319.0], [435.0, 397.0], [450.0, 323.5], [489.0, 353.0], [488.0, 347.0], [483.0, 334.0], [509.0, 330.0], [505.0, 339.0], [536.0, 350.5], [541.0, 351.0], [532.0, 359.0], [547.0, 338.0], [562.0, 337.0], [553.0, 341.0], [554.0, 318.0], [566.0, 333.0], [575.0, 341.0], [561.0, 314.0], [571.0, 337.0], [550.0, 283.0], [558.0, 338.0], [545.0, 342.0], [563.0, 341.0], [564.0, 346.0], [600.0, 329.0], [598.0, 322.0], [587.0, 327.0], [599.0, 304.0], [592.0, 294.5], [607.0, 333.0], [591.0, 324.0], [604.0, 307.0], [606.0, 297.0], [582.0, 301.0], [580.0, 327.0], [577.0, 322.0], [609.0, 315.0], [612.0, 324.0], [613.0, 301.0], [611.0, 319.0], [635.0, 303.0], [610.0, 305.0], [631.0, 280.0], [627.0, 297.0], [643.0, 259.0], [666.0, 264.0], [646.0, 311.0], [667.0, 275.0], [684.0, 277.0], [681.0, 287.0], [677.0, 273.0], [680.0, 289.0], [686.0, 282.5], [701.0, 275.0], [674.0, 289.0], [673.0, 273.0], [695.0, 278.0], [682.0, 279.0], [731.0, 263.0], [732.0, 261.0], [735.0, 256.0], [716.0, 235.0], [753.0, 250.0], [766.0, 239.0], [747.0, 253.0], [765.0, 238.0], [737.0, 251.0], [743.0, 218.0], [790.0, 240.0], [796.0, 235.0], [792.0, 217.0], [825.0, 226.0], [816.0, 224.0], [828.0, 219.0], [820.0, 215.0], [827.0, 235.0], [818.0, 221.0], [860.0, 213.0], [838.0, 232.0], [856.0, 224.0], [858.0, 217.0], [839.0, 222.0], [863.0, 219.0], [870.0, 216.0], [869.0, 205.0], [908.0, 209.0], [905.0, 191.0], [927.0, 201.0], [897.0, 201.0], [920.0, 172.0], [933.0, 213.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 933.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 172.0, "minX": 138.0, "maxY": 957.0, "series": [{"data": [[138.0, 305.5], [257.0, 365.0], [272.0, 957.0], [292.0, 314.5], [297.0, 479.0], [310.0, 522.0], [334.0, 383.5], [337.0, 598.0], [416.0, 369.5], [426.0, 319.0], [435.0, 397.0], [450.0, 323.5], [489.0, 353.0], [488.0, 347.0], [483.0, 334.0], [509.0, 330.0], [505.0, 339.0], [536.0, 350.5], [541.0, 351.0], [532.0, 359.0], [547.0, 338.0], [562.0, 337.0], [553.0, 341.0], [554.0, 318.0], [566.0, 333.0], [575.0, 341.0], [561.0, 314.0], [571.0, 337.0], [550.0, 283.0], [558.0, 338.0], [545.0, 342.0], [563.0, 341.0], [564.0, 346.0], [600.0, 329.0], [598.0, 322.0], [587.0, 327.0], [599.0, 304.0], [592.0, 294.5], [607.0, 333.0], [591.0, 324.0], [604.0, 307.0], [606.0, 297.0], [582.0, 301.0], [580.0, 327.0], [577.0, 322.0], [609.0, 315.0], [612.0, 324.0], [613.0, 301.0], [611.0, 319.0], [635.0, 303.0], [610.0, 305.0], [631.0, 280.0], [627.0, 297.0], [643.0, 259.0], [666.0, 264.0], [646.0, 311.0], [667.0, 275.0], [684.0, 277.0], [681.0, 287.0], [677.0, 273.0], [680.0, 289.0], [686.0, 282.5], [701.0, 275.0], [674.0, 289.0], [673.0, 273.0], [695.0, 278.0], [682.0, 279.0], [731.0, 263.0], [732.0, 261.0], [735.0, 256.0], [716.0, 235.0], [753.0, 250.0], [766.0, 239.0], [747.0, 253.0], [765.0, 238.0], [737.0, 251.0], [743.0, 218.0], [790.0, 239.5], [796.0, 235.0], [792.0, 217.0], [825.0, 226.0], [816.0, 224.0], [828.0, 219.0], [820.0, 215.0], [827.0, 235.0], [818.0, 221.0], [860.0, 213.0], [838.0, 232.0], [856.0, 224.0], [858.0, 217.0], [839.0, 222.0], [863.0, 219.0], [870.0, 216.0], [869.0, 205.0], [908.0, 209.0], [905.0, 191.0], [927.0, 201.0], [897.0, 201.0], [920.0, 172.0], [933.0, 213.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 933.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 181.6, "minX": 1.71277416E12, "maxY": 575.7166666666667, "series": [{"data": [[1.71277422E12, 575.7166666666667], [1.71277416E12, 181.6], [1.71277428E12, 461.18333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71277428E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 178.41666666666666, "minX": 1.71277416E12, "maxY": 575.5666666666667, "series": [{"data": [[1.71277422E12, 575.5666666666667], [1.71277416E12, 178.41666666666666], [1.71277428E12, 464.51666666666665]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.71277428E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 178.41666666666666, "minX": 1.71277416E12, "maxY": 575.5666666666667, "series": [{"data": [[1.71277422E12, 575.5666666666667], [1.71277416E12, 178.41666666666666], [1.71277428E12, 464.51666666666665]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71277428E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 178.41666666666666, "minX": 1.71277416E12, "maxY": 575.5666666666667, "series": [{"data": [[1.71277422E12, 575.5666666666667], [1.71277416E12, 178.41666666666666], [1.71277428E12, 464.51666666666665]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.71277428E12, "title": "Total Transactions Per Second"}},
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

