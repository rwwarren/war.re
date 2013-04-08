<?php
echo 'You are being redirected, if that doesn\'t work, click ' .
	'<a href="/n">here</a> if it does not work';
header("Location: /n");
exit;
?>
