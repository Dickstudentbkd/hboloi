        <?php
class Tabel {
    public $rijen;
    public $kolommen;
    public $tabel;

    private function __construct($rijen, $kolommen) {
        $this->rijen = $rijen;
        $this->kolommen = $kolommen;
    }
    public function getTableRow() { //meteen aantal kolommen meenemen
        $this->tabel .= '<tr>';
        for ($i=1;$i<=$kolommen;$i++) {
            $this->tabel .= "<td></td>";
        }
    }
}