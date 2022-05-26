export interface ItineraryLine {
  /**线路ID */
  gdl_id: string
  line_day: string
  line_title: string
  line_detail: string
  line_detail_dining: string
  line_detail_stay: string
}

interface GoodsInfo {
  goods_id?: string
  price?: string
  agency_id?: string
  goods_name?: string
  /**商品类型 */
  goods_type?: string
  status?: string
  cover_image?: string
  line?: ItineraryLine[]
}

export interface GoodsSKU {
  sku_id: string
  goods_id: string
  goods_attr_ids: string
  /**库存 */
  stock: string
  admin_id: string
  company_id: string
  add_date: string
  last_date: string
  agency_id: string
  /**商品名称 */
  goods_name: string
  /**商品类型 */
  goods_type: 'line' | string
  price: string
  status: string
  cover_image: string
  goodsInfo: GoodsInfo
}
