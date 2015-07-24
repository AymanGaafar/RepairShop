namespace RepairShop.Components
{
    using System;
    using System.ComponentModel.DataAnnotations;

    class KeyValueResult<K,V>
    {
        [Display(Name="Key")]
        public K Key { get; set; }

        [Display(Name = "Value")]
        public V Value { get; set; }
    }
}
