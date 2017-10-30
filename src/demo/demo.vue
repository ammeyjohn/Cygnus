<template>
    <Card :bordered="false">
        <p slot="title">无边框标题</p>
        <form>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="staticEmail" value="email@example.com">
                        </div>
                    </div>                    
                </div>
                <div class="col-md-4">
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
                        </div>
                    </div>
                </div>                
            </div>
        </form>
    </Card>

    
</template>

<script>
    import $ from 'jquery';
    export default {
        
    }
</script>
